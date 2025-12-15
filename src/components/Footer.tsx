
import { Wallet, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-rose-50 border-t border-rose-100 py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">

                    {/* Brand */}
                    <div className="space-y-4 max-w-xs">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-200">
                                <Wallet size={20} />
                            </div>
                            <span className="text-xl font-bold text-slate-900">Wallet<span className="text-rose-500">Glow</span></span>
                        </div>
                        <p className="text-slate-500 font-medium">Empowering neurodivergent minds to spend intentionally. Built with 💖 for the ADHD community.</p>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <h4 className="font-bold text-slate-900">Product</h4>
                            <ul className="space-y-3 text-sm text-slate-500">
                                <li><a href="#features" className="hover:text-rose-500 transition-all duration-300 hover:translate-x-1 inline-block">Features</a></li>
                                <li><a href="#about" className="hover:text-rose-500 transition-all duration-300 hover:translate-x-1 inline-block">About Us</a></li>
                                <li><a href="#pricing" className="hover:text-rose-500 transition-all duration-300 hover:translate-x-1 inline-block">Pricing</a></li>
                                <li><a href="#stories" className="hover:text-rose-500 transition-all duration-300 hover:translate-x-1 inline-block">Stories</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-bold text-slate-900">Company</h4>
                            <ul className="space-y-3 text-sm text-slate-500">
                                <li><a href="#about" className="hover:text-rose-500 transition-all duration-300 hover:translate-x-1 inline-block">About Us</a></li>
                                <li><a href="#privacy" className="hover:text-rose-500 transition-all duration-300 hover:translate-x-1 inline-block">Privacy Policy</a></li>
                                <li><a href="#terms" className="hover:text-rose-500 transition-all duration-300 hover:translate-x-1 inline-block">Terms of Service</a></li>
                                <li><a href="#support" className="hover:text-rose-500 transition-all duration-300 hover:translate-x-1 inline-block">Support</a></li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-rose-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <p className="text-slate-400 font-medium text-sm">© 2024 WalletGlow. All rights reserved.</p>
                        <div className="flex space-x-6 text-sm text-slate-500">
                            <a href="#privacy" className="hover:text-rose-500 transition-colors">Privacy Policy</a>
                            <a href="#terms" className="hover:text-rose-500 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-rose-500 transition-colors">Cookies</a>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all hover:scale-110 shadow-sm hover:shadow-md">
                            <Twitter size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all hover:scale-110 shadow-sm hover:shadow-md">
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all hover:scale-110 shadow-sm hover:shadow-md">
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer >
    );
};
