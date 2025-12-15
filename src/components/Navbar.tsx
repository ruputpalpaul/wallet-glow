import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        // Check auth state
        import('../lib/supabase').then(({ supabase }) => {
            supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                setUser(session?.user ?? null);
            });
            return subscription;
        }).then(() => {
            // efficient cleanup in strict mode
        });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        const { supabase } = await import('../lib/supabase');
        await supabase.auth.signOut();
        setUser(null);
        window.location.href = '#';
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#fffdf9]/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                        <Sparkles size={16} className="text-indigo-500" />
                    </div>
                    <span className="font-outfit font-bold text-xl text-slate-900 group-hover:text-rose-500 transition-colors duration-300">WalletGlow</span>
                </a>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-slate-600 hover:text-rose-500 font-medium transition-all hover:scale-105">Features</a>
                    <a href="#how-it-works" className="text-slate-600 hover:text-rose-500 font-medium transition-all hover:scale-105">How it Works</a>
                    <a href="#stories" className="text-slate-600 hover:text-rose-500 font-medium transition-all hover:scale-105">Stories</a>
                    <a href="#pricing" className="text-slate-600 hover:text-rose-500 font-medium transition-all hover:scale-105">Pricing</a>
                    <a href="#about" className="text-slate-600 hover:text-rose-500 font-medium transition-all hover:scale-105">About</a>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <a href="#dashboard" className="text-slate-600 hover:text-rose-500 font-bold transition-all hover:scale-105">Dashboard</a>
                            <button onClick={handleLogout} className="bg-rose-100 hover:bg-rose-200 text-rose-600 px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="#login" className="text-slate-600 hover:text-rose-500 font-bold transition-all hover:scale-105">Login</a>
                            <a href="#signup" className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-rose-200">
                                Get Extension
                            </a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
