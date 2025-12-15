
import { useState, useEffect } from 'react';
import { Sparkles, CreditCard, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Helper to manually parse query params from hash router (since we are using window.location.hash)
const useHashQuery = () => {
    const [query, setQuery] = useState<Record<string, string>>({});
    useEffect(() => {
        const parseHash = () => {
            const hash = window.location.hash;
            if (hash.includes('?')) {
                const search = hash.split('?')[1];
                const params = new URLSearchParams(search);
                const q: Record<string, string> = {};
                params.forEach((val, key) => { q[key] = val; });
                setQuery(q);
            }
        };
        parseHash(); // initial
        window.addEventListener('hashchange', parseHash);
        return () => window.removeEventListener('hashchange', parseHash);
    }, []);
    return query;
};

export const CheckoutPage = () => {
    const query = useHashQuery();
    const plan = query.plan || 'monthly';
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Prefill email if logged in
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user?.email) setEmail(user.email);
        });
    }, []);

    const handlePayment = async () => {
        setLoading(true);
        // Stripe Payment Links
        const MONTHLY_LINK = 'https://buy.stripe.com/test_dRm8wIcZT5al34M8hhe3e00';
        const LIFETIME_LINK = 'https://buy.stripe.com/test_7sYeV65xrcCN6gY7dde3e01';

        const { data: { user } } = await supabase.auth.getUser();

        let baseUrl = plan === 'lifetime' ? LIFETIME_LINK : MONTHLY_LINK;
        // If user is logged in, attach their ID for webhook association
        if (user) {
            const separator = baseUrl.includes('?') ? '&' : '?';
            baseUrl = `${baseUrl}${separator}client_reference_id=${user.id}`;
            if (email) baseUrl += `&prefilled_email=${encodeURIComponent(email)}`;
        } else if (email) {
            const separator = baseUrl.includes('?') ? '&' : '?';
            baseUrl = `${baseUrl}${separator}prefilled_email=${encodeURIComponent(email)}`;
        }

        window.location.href = baseUrl;
    };

    const isMonthly = plan === 'monthly';

    return (
        <div className="min-h-screen pt-24 pb-20 flex items-center justify-center bg-[#fffdf9] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-rose-50/50 rounded-full blur-3xl opacity-60" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-3xl opacity-60" />
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 max-w-lg w-full relative z-10 animate-fade-in-up">

                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                            <Sparkles size={16} className="text-rose-500" />
                        </div>
                        <span className="font-bold text-slate-900 text-lg">WalletGlow</span>
                    </div>
                    <button onClick={() => window.history.back()} className="text-slate-400 hover:text-slate-600 transition-colors">
                        ✕
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    {isMonthly ? 'Start your free trial' : 'Get Lifetime Access'}
                </h1>
                <p className="text-slate-500 mb-8">
                    {isMonthly ? 'Free for 7 days, then $4.99/month' : 'One-time payment of $50, yours forever'}
                </p>

                {/* Plan Summary Card */}
                <div className="bg-rose-50/50 rounded-3xl p-6 border border-rose-100 mb-8">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="text-xs text-rose-400 font-bold uppercase tracking-wider mb-1">Plan</div>
                            <div className="text-lg font-bold text-slate-900">{isMonthly ? 'Monthly Plan' : 'Lifetime Access'}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-slate-900">{isMonthly ? '$4.99' : '$50.00'}</div>
                            <div className="text-xs text-slate-500">{isMonthly ? 'per month' : 'one-time'}</div>
                        </div>
                    </div>

                    {isMonthly && (
                        <div className="bg-white rounded-xl p-4 flex items-start gap-3 shadow-sm border border-rose-100/50">
                            <div className="text-blue-400 mt-0.5">ℹ️</div>
                            <div className="text-xs text-slate-500 leading-relaxed">
                                <span className="font-bold text-slate-700">Trial ends {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                                <br />
                                You'll be charged $4.99 unless you cancel before then. Cancel anytime from your account settings.
                            </div>
                        </div>
                    )}
                </div>

                {/* Form Fields - Visual wrapper for redirection flow */}
                <div className="space-y-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 outline-none transition-all placeholder:text-slate-300"
                        />
                    </div>

                    {/* Card Information - Visual only, actual entry happens on Stripe */}
                    <div className="opacity-70 pointer-events-none relative">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Card information (Enter on Next Step)</label>
                        <div className="space-y-3">
                            <div className="relative">
                                <CreditCard size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input disabled placeholder="•••• •••• •••• ••••" className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input disabled placeholder="MM / YY" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400" />
                                <input disabled placeholder="CVC" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400" />
                            </div>
                        </div>
                        {/* Overlay to explain redirection */}
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
                            {/* <span className="bg-slate-900 text-white text-xs px-2 py-1 rounded">Securely managed by Stripe 🔒</span> */}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-400 to-rose-500 text-white font-bold text-lg shadow-xl shadow-rose-200 hover:shadow-2xl hover:shadow-rose-300/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <span className="animate-spin text-white">⏳</span>
                    ) : (
                        <>
                            <Lock size={18} />
                            {isMonthly ? 'Start Free Trial via Stripe' : 'Proceed to Secure Payment'}
                        </>
                    )}
                </button>

                <div className="text-center mt-6 space-y-2">
                    <p className="text-xs text-slate-400">Secured by Stripe • Your payment info is encrypted</p>
                    <p className="text-[10px] text-slate-300 max-w-xs mx-auto leading-relaxed">
                        By confirming, you agree to WalletGlow's Terms of Service.
                        {isMonthly && ' Cancel anytime before trial ends to avoid charges.'}
                    </p>
                </div>

            </div>
        </div>
    );
}
