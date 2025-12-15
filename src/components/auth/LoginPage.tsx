
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { AuthLayout } from './AuthLayout';
import { Loader2, AlertCircle } from 'lucide-react';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
        } else {
            // successful login
            const hash = window.location.hash;
            const queryPart = hash.includes('?') ? hash.split('?')[1] : '';
            const params = new URLSearchParams(queryPart);
            const nextParam = params.get('next');
            const planParam = params.get('plan');

            if (nextParam === 'checkout') {
                window.location.hash = `#checkout${planParam ? `?plan=${planParam}` : ''}`;
            } else {
                window.location.hash = '#dashboard';
            }
            // window.location.reload(); // Reload might clear state but ensures fresh session check
            // For SPA, maybe not needed if state updates, but App.tsx reloading is safer
            window.location.reload();
        }
    };

    return (
        <AuthLayout title="Welcome Back" subtitle="Sign in to access your dashboard">
            <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm flex items-start gap-2">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        {error}
                    </div>
                )}

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
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : 'Sign In'}
                    </button>
                </div>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Don't have an account? <a href="#signup" className="text-rose-500 font-bold hover:underline">Sign up</a>
                </p>
            </form>
        </AuthLayout>
    );
}
