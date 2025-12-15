import { useState, useEffect } from 'react';
import { Heart, Clock, ExternalLink, CheckCircle2, DollarSign } from 'lucide-react';
import { storage, type BlockState } from '../lib/storage';
import { Card } from './Card';

export function WishlistPage() {
    const [items, setItems] = useState<BlockState[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            const savedItems = await storage.getItems();
            setItems(savedItems);
        } catch (e) {
            console.error("Failed to load items", e);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveItem = async (url: string) => {
        await storage.removeItem(url);
        loadItems();
    };

    const getDomain = (url: string) => {
        try {
            return new URL(url).hostname.replace('www.', '');
        } catch {
            return 'Unknown Site';
        }
    };

    if (loading) {
        return <div className="p-8 text-text-muted">Loading your wishlist...</div>;
    }

    // Split items into cooling and ready
    const coolingItems: BlockState[] = [];
    const readyItems: BlockState[] = [];
    let totalPotential = 0;

    items.forEach(item => {
        const now = Date.now();
        const diff = now - item.timestamp;
        const totalMs = (48 * 60 * 60 * 1000) - diff;
        totalPotential += (item.price || 0);

        if (totalMs > 0) {
            coolingItems.push(item);
        } else {
            readyItems.push(item);
        }
    });

    return (
        <div className="space-y-8 pb-12">
            <div>
                <h1 className="text-text-emphasis mb-2 text-2xl font-bold flex items-center gap-2">
                    Cooling Off Wishlist
                </h1>
                <p className="text-text-muted flex items-center gap-2">
                    Your 48-hour reality check zone <span className="text-yellow-400">✨</span>
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-[#FFF0F5] p-6 rounded-3xl border-none flex items-center justify-between">
                    <div>
                        <div className="text-xs text-text-muted mb-1">Currently Cooling</div>
                        <div className="text-3xl font-bold text-text-emphasis">{coolingItems.length}</div>
                        <div className="text-xs text-text-muted">Items paused</div>
                    </div>
                    <div className="w-12 h-12 bg-pink-200/50 rounded-full flex items-center justify-center text-pink-500">
                        <Clock size={24} />
                    </div>
                </Card>
                <Card className="bg-[#F0F9FF] p-6 rounded-3xl border-none flex items-center justify-between">
                    <div>
                        <div className="text-xs text-text-muted mb-1">Potential Spending</div>
                        <div className="text-3xl font-bold text-text-emphasis">${totalPotential}</div>
                        <div className="text-xs text-text-muted">If you buy all</div>
                    </div>
                    <div className="w-12 h-12 bg-blue-200/50 rounded-full flex items-center justify-center text-blue-500">
                        <DollarSign size={24} />
                    </div>
                </Card>
                <Card className="bg-[#F3E8FF] p-6 rounded-3xl border-none flex items-center justify-between">
                    <div>
                        <div className="text-xs text-text-muted mb-1">Already Saved</div>
                        <div className="text-3xl font-bold text-text-emphasis">$141</div>
                        <div className="text-xs text-text-muted">from expired items</div>
                    </div>
                    <div className="w-12 h-12 bg-purple-200/50 rounded-full flex items-center justify-center text-purple-500">
                        <CheckCircle2 size={24} />
                    </div>
                </Card>
            </div>

            {/* Cooling Section */}
            <div>
                <h2 className="text-lg font-bold text-text-emphasis mb-4">Items in Cooling Period</h2>
                {coolingItems.length === 0 ? (
                    <div className="text-center py-12 bg-bg-dark rounded-3xl border border-dashed border-border-subtle">
                        <p className="text-text-muted">No items currently cooling off.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {coolingItems.map((item, idx) => (
                            <CoolingItemCard key={idx} item={item} getDomain={getDomain} onRemove={handleRemoveItem} />
                        ))}
                    </div>
                )}
            </div>

            {/* Ready Section */}
            {readyItems.length > 0 && (
                <div>
                    <h2 className="text-lg font-bold text-text-emphasis mb-4">Cooling Period Complete</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {readyItems.map((item, idx) => (
                            <ReadyItemCard key={idx} item={item} getDomain={getDomain} onRemove={handleRemoveItem} />
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-4 flex items-center gap-3">
                <div className="text-pink-400">✨</div>
                <div className="text-xs text-text-muted">
                    <strong>You're doing incredible!</strong><br />
                    Taking time to think about purchases shows real self-awareness. Proud of you! 💖
                </div>
            </div>
        </div>
    );
}

function CoolingItemCard({ item, getDomain, onRemove }: { item: BlockState, getDomain: Function, onRemove: Function }) {
    const now = Date.now();
    const diff = now - item.timestamp;
    const totalMs = (48 * 60 * 60 * 1000) - diff;

    // Calculate hours/mins
    const hours = Math.floor(totalMs / (1000 * 60 * 60));
    const mins = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));

    // Progress calculation (inverse of time left)
    const totalDuration = 48 * 60 * 60 * 1000;
    const progress = Math.min(100, Math.max(0, ((totalDuration - totalMs) / totalDuration) * 100));

    return (
        <Card className="bg-bg-dark p-6 rounded-[2rem] border border-border-subtle hover:scale-[1.01] transition-transform">
            <div className="flex gap-6">
                <div className="w-24 h-24 bg-pink-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-pink-200">
                    <Heart size={32} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-base font-medium text-text-emphasis truncate pr-4">{getDomain(item.url)} Item</h3>
                            <div className="text-2xl font-bold text-pink-emphasis my-1">${item.price || 0}</div>
                        </div>
                    </div>

                    <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                            <Clock size={12} />
                            <span>{hours}h {mins}m {58}s</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className="h-full bg-pink-emphasis rounded-full" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="text-[10px] text-pink-400 font-medium pt-1">
                            Expires soon!
                        </div>
                    </div>
                </div>
            </div>
            <button
                onClick={() => onRemove(item.url)}
                className="w-full mt-6 bg-pink-50 text-text-muted py-2.5 rounded-xl text-sm font-medium hover:bg-pink-100 transition-colors border-none cursor-pointer"
            >
                ✕ Remove
            </button>
        </Card>
    );
}

function ReadyItemCard({ item, getDomain, onRemove }: { item: BlockState, getDomain: Function, onRemove: Function }) {
    return (
        <Card className="bg-bg-dark p-6 rounded-[2rem] border border-border-subtle hover:scale-[1.01] transition-transform bg-gradient-to-br from-white to-blue-50/30">
            <div className="flex gap-6">
                <div className="w-24 h-24 bg-pink-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-pink-200">
                    <Heart size={32} />
                </div>
                <div className="flex-1">
                    <h3 className="text-base font-medium text-text-emphasis">{getDomain(item.url)} Item</h3>
                    <div className="text-2xl font-bold text-text-emphasis my-1">${item.price || 0}</div>
                    <div className="flex items-center gap-1.5 text-xs text-green-500 font-medium mt-2">
                        <CheckCircle2 size={12} /> Ready to decide
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                <button
                    onClick={() => onRemove(item.url)}
                    className="flex-1 bg-white border border-border-subtle text-text-muted py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 cursor-pointer"
                >
                    Don't Need It
                </button>
                <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-pink-emphasis text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 flex items-center justify-center gap-2 no-underline"
                >
                    <ExternalLink size={14} /> Buy Now
                </a>
            </div>
        </Card>
    );
}
