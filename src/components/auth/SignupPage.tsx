
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { AuthLayout } from './AuthLayout';
import { Loader2, AlertCircle } from 'lucide-react';

export function SignupPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Successful signup
            // For simplicity, we assume auto-signin is on or email confirm is off for testing. 
            // In prod, check data.session. 
            // Redirecting to pricing or dashboard
            const nextParam = new URLSearchParams(window.location.search).get('next');
            if (nextParam === 'pricing') {
                window.location.hash = '#pricing';
            } else {
                window.location.hash = '#dashboard';
            }
            window.location.reload();
        }
    };

    return (
        <AuthLayout title="Create Account" subtitle="Join WalletGlow today">
            <form onSubmit={handleSignup} className="space-y-4">
                {error && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm flex items-start gap-2">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Full Name</label>
                    <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium"
                        placeholder="Jane Doe"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium"
                        placeholder="••••••••"
                        minLength={6}
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-rose-500 text-white font-bold shadow-lg shadow-rose-200 hover:bg-rose-600 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : 'Create Account'}
                    </button>
                </div>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Already have an account? <a href="#login" className="text-rose-500 font-bold hover:underline">Sign in</a>
                </p>
            </form>
        </AuthLayout>
    );
}
