
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
            // Parse params from hash since we use hash routing
            const hash = window.location.hash;
            const queryPart = hash.includes('?') ? hash.split('?')[1] : '';
            const params = new URLSearchParams(queryPart);
            const nextParam = params.get('next');
            const planParam = params.get('plan');

            if (nextParam === 'pricing') {
                window.location.hash = '#pricing';
            } else if (nextParam === 'checkout') {
                window.location.hash = `#checkout${planParam ? `?plan=${planParam}` : ''}`;
            } else {
                window.location.hash = '#dashboard';
            }
            window.location.reload();
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'apple') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: window.location.origin,
            },
        });
        if (error) setError(error.message);
    };

    // Debug Check for "Load Failed"
    const isConfigMissing = (!import.meta.env.VITE_SUPABASE_URL && !import.meta.env.NEXT_PUBLIC_SUPABASE_URL) ||
        (!import.meta.env.VITE_SUPABASE_ANON_KEY && !import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    return (
        <AuthLayout title="Create Account" subtitle="Join WalletGlow today">
            <div className="space-y-3 mb-6">
                <button
                    type="button"
                    onClick={() => handleSocialLogin('google')}
                    className="w-full py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold transition-all flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Continue with Google
                </button>
                <button
                    type="button"
                    onClick={() => handleSocialLogin('apple')}
                    className="w-full py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold transition-all flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5 text-black fill-current" viewBox="0 0 24 24">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-1.23 3.96-1.14 1.34.07 2.37.66 3.04 1.61-2.66 1.59-2.14 5.92.56 7.15-.55 1.48-1.24 2.88-2.64 4.61zM11.97.1c.21 1.93-1.52 3.69-3.22 3.68-.44-1.95 2.01-3.69 3.22-3.68z" />
                    </svg>
                    Continue with Apple
                </button>
            </div>

            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-400 font-bold tracking-wider">Or continue with email</span>
                </div>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
                {isConfigMissing && (
                    <div className="p-3 rounded-xl bg-amber-50 text-amber-800 text-sm flex items-start gap-2 border border-amber-200">
                        <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-600" />
                        <div>
                            <strong>Configuration Missing:</strong> Supabase URL/Key not found.
                            <br />
                            Please check your <code>.env</code> file.
                        </div>
                    </div>
                )}
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
