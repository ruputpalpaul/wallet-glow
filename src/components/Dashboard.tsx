
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Sparkles, Loader2, LogOut, Crown } from 'lucide-react';

interface Profile {
    full_name: string;
    subscription_status: 'free' | 'monthly' | 'lifetime';
}

export function Dashboard() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (!error && data) {
                    setProfile(data);
                }
            }
        } catch (error) {
            console.error('Error loading profile', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.hash = '';
        window.location.reload();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fffdf9]">
                <Loader2 className="animate-spin text-rose-400" size={32} />
            </div>
        );
    }

    const isPremium = profile?.subscription_status === 'monthly' || profile?.subscription_status === 'lifetime';

    return (
        <div className="min-h-screen bg-[#fffdf9] pt-24 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 font-display mb-1">
                            Hello, {profile?.full_name?.split(' ')[0] || 'Friend'}! 👋
                        </h1>
                        <p className="text-slate-500">Welcome to your personal space.</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-rose-500 transition-colors text-sm font-bold"
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Status Card */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-100/50 border border-slate-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isPremium ? 'bg-indigo-100 text-indigo-500' : 'bg-slate-100 text-slate-400'}`}>
                                <Crown size={24} className="fill-current" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Current Plan</h3>
                                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mt-1 ${isPremium ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                                    {profile?.subscription_status || 'Free'}
                                </div>
                            </div>
                        </div>

                        {isPremium ? (
                            <div className="space-y-4">
                                <p className="text-slate-600 text-sm">You have full access to all premium features. Thank you for your support! 💖</p>
                                <button className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                                    Manage Subscription
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-slate-600 text-sm">You are currently on the free plan. Upgrade to unlock the full potential of WalletGlow.</p>
                                <button
                                    onClick={() => window.location.hash = '#pricing'}
                                    className="w-full py-3 rounded-xl bg-rose-500 text-white font-bold hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200 flex items-center justify-center gap-2"
                                >
                                    <Sparkles size={16} className="fill-current" /> Upgrade Now
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Download Card */}
                    <div className="bg-rose-50 rounded-[2rem] p-8 border border-rose-100">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Get the Extension</h3>
                        <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                            Don't forget to install the WalletGlow browser extension to start blocking impulse buys on Amazon.
                        </p>
                        <button className="w-full py-3 rounded-xl bg-white text-rose-500 font-bold border-2 border-rose-200 hover:bg-rose-50 transition-colors">
                            Download for Chrome
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
