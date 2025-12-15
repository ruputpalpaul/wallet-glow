import { supabase } from './supabase';

export interface BlockState {
    timestamp: number;
    url: string;
    bypassed: boolean;
    price: number;
}

// Helper to get or create a persistent user ID
const getUserId = async (): Promise<string> => {
    const key = 'walletglow_user_id';
    const result = await chrome.storage.local.get(key);
    if (result[key]) return result[key] as string;

    // Generate simple ID
    const newId = Math.random().toString(36).substring(2, 15);
    await chrome.storage.local.set({ [key]: newId });
    return newId;
};

export const storage = {
    async isWhitelisted(url: string): Promise<boolean> {
        const key = `wb_${url}`;
        const result = await chrome.storage.local.get(key);
        const data = result[key] as BlockState;

        if (!data) return false;

        if (data.bypassed) return true;

        const now = Date.now();
        const diff = now - data.timestamp;
        const hours48 = 48 * 60 * 60 * 1000;

        return diff > hours48;
    },

    async startCoolDown(url: string, price: number = 0): Promise<void> {
        // 1. Local Persistence (for speed/blocking)
        const key = `wb_${url}`;
        const timestamp = Date.now();
        const state: BlockState = {
            timestamp,
            url,
            bypassed: false,
            price
        };
        await chrome.storage.local.set({ [key]: state });

        // 2. Cloud Sync
        try {
            const userId = await getUserId();
            await supabase.from('items').insert({
                user_id: userId,
                url,
                price,
                timestamp, // JS timestamp
                bypassed: false
            });
        } catch (e) {
            console.error('Failed to sync to Supabase', e);
            window.dispatchEvent(new CustomEvent('walletglow-error', {
                detail: { message: 'Saved offline. Cloud sync failed.' }
            }));
        }
    },

    async allowBypass(url: string): Promise<void> {
        const key = `wb_${url}`;
        const result = await chrome.storage.local.get(key);
        const data = result[key] || { timestamp: Date.now(), url, bypassed: false, price: 0 };

        // Local
        await chrome.storage.local.set({
            [key]: { ...data, bypassed: true }
        });

        // Cloud
        try {
            const userId = await getUserId();
            // We match by URL and User for MVP (assuming unique URLs per user active)
            await supabase.from('items')
                .update({ bypassed: true })
                .eq('user_id', userId)
                .eq('url', url);
        } catch (e) {
            console.error('Supabase update failed', e);
        }
    },

    async removeItem(url: string): Promise<void> {
        const key = `wb_${url}`;
        await chrome.storage.local.remove(key);

        // Cloud
        try {
            const userId = await getUserId();
            await supabase.from('items')
                .delete()
                .eq('user_id', userId)
                .eq('url', url);
        } catch (e) {
            console.error('Supabase delete failed', e);
        }
    },

    async getItems(): Promise<BlockState[]> {
        // Try Cloud first
        try {
            const userId = await getUserId();
            const { data, error } = await supabase
                .from('items')
                .select('*')
                .eq('user_id', userId)
                .eq('bypassed', false)
                .order('timestamp', { ascending: false });

            if (!error && data) {
                return data.map(item => ({
                    url: item.url,
                    timestamp: parseInt(item.timestamp), // Ensure number
                    price: item.price,
                    bypassed: item.bypassed
                }));
            }
        } catch (e) {
            console.warn('Fetching from cloud failed, falling back to local', e);
        }

        // Fallback to Local
        const allData = await chrome.storage.local.get(null);
        const items: BlockState[] = [];
        for (const key in allData) {
            if (key.startsWith('wb_')) {
                const item = allData[key] as BlockState;
                if (!item.bypassed) {
                    items.push(item);
                }
            }
        }
        return items.sort((a, b) => b.timestamp - a.timestamp);
    },

    async getStats(): Promise<{ streak: number; moneySaved: number }> {
        // Try Cloud
        try {
            const userId = await getUserId();
            const { data, error } = await supabase
                .from('items')
                .select('price')
                .eq('user_id', userId)
                .eq('bypassed', false);

            if (!error && data) {
                const streak = data.length;
                const moneySaved = data.reduce((sum, item) => sum + (item.price || 0), 0);
                return { streak, moneySaved };
            }
        } catch (e) {
            console.warn('Stats cloud fetch failed', e);
        }

        // Fallback
        const allData = await chrome.storage.local.get(null);
        let streak = 0;
        let moneySaved = 0;
        for (const key in allData) {
            if (key.startsWith('wb_')) {
                const item = allData[key] as BlockState;
                if (!item.bypassed) {
                    streak++;
                    moneySaved += (item.price || 0);
                }
            }
        }
        return { streak, moneySaved };
    }
};
