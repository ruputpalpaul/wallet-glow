
import { Check } from 'lucide-react';

export const Pricing = () => {
    return (
        <section id="pricing" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <div>
                        <span className="text-rose-500 font-bold tracking-wider uppercase mb-2 block">Simple Pricing</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Invest in your <br />future self.</h2>
                        <p className="text-xl text-slate-600 mb-8 max-w-md">
                            For less than the cost of one impulse latte, save hundreds (or thousands) every month.
                        </p>

                        <div className="flex gap-4 mb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-slate-500 font-bold">Risk-free trial</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-slate-500 font-bold">Cancel anytime</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-200 to-indigo-200 rounded-[40px] blur-2xl opacity-50 transform translate-y-4" />

                        <div className="relative bg-white rounded-[40px] p-10 shadow-xl border border-rose-100">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-800">Pro Membership</h3>
                                    <p className="text-slate-500 font-medium">Everything you need to stop spending.</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-4xl font-extrabold text-slate-900">$5</div>
                                    <div className="text-slate-400 font-bold">/month</div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10">
                                {['Unlimited Impulse Blocking', 'Advanced "Gauntlet" Mode', 'Detailed Savings Analytics', 'Custom Wishlist Organization', 'Priority Support'].map(item => (
                                    <div key={item} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                            <Check size={14} className="text-green-600" />
                                        </div>
                                        <span className="text-slate-600 font-bold">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-4 bg-slate-900 text-white font-bold text-lg rounded-2xl hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                                Start Saving Now
                            </button>

                            <p className="text-center text-xs text-slate-400 font-bold mt-4 uppercase tracking-wide">Secure payment via Stripe</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
