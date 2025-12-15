import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#fffdf9]/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
            }`}>
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
                    {['Features', 'How It Works', 'Stories', 'About', 'Pricing'].map((item) => {
                        const linkHref = item === 'About' ? '#about' : item === 'Pricing' ? '#pricing' : `#${item.toLowerCase().replace(/ /g, '-')}`;
                        return (
                            <a key={item} href={linkHref} className="text-sm font-medium text-slate-500 hover:text-rose-500 transition-colors duration-300 relative group">
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-400 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
                            </a>
                        );
                    })}
                </div>

                {/* CTA */}
                <a href="#pricing" className="bg-gradient-to-r from-rose-400 to-rose-500 text-white px-6 py-2.5 rounded-full font-medium shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 group">
                    <Sparkles size={16} className="fill-white/20 group-hover:rotate-12 transition-transform" />
                    Get Started
                </a>
            </div>
        </nav>
    );
};
