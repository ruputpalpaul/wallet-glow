import { Heart, Trophy, DollarSign, Sparkles, Check, ArrowRight, Smartphone } from 'lucide-react';

export const CTASection = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* Left Column - Dashboard Preview Card */}
                    <div className="relative">
                        {/* Background Blob */}
                        <div className="absolute top-10 left-10 w-full h-full bg-rose-50 rounded-[3rem] -z-10 transform rotate-3 scale-105" />

                        <div className="bg-[#fffdf9] p-8 md:p-10 rounded-[3rem] shadow-xl border border-slate-100 relative">
                            {/* Floating Badge */}
                            <div className="absolute -top-4 -right-4 bg-rose-400 text-white px-4 py-2 rounded-xl shadow-lg border-2 border-white transform rotate-6 flex flex-col items-center">
                                <Trophy size={20} className="mb-1" />
                                <span className="text-xs font-bold">On Fire!</span>
                            </div>

                            <div className="text-center mb-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-slate-100 shadow-sm mb-4">
                                    <Sparkles size={12} className="text-rose-400" />
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Your Progress This Month</span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">You're doing amazing! 💖</h3>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                {/* Stat 1 */}
                                <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-50 flex flex-col items-center text-center">
                                    <div className="w-10 h-10 bg-rose-400 rounded-full flex items-center justify-center text-white mb-3 shadow-md shadow-rose-200">
                                        <Heart size={18} className="fill-current" />
                                    </div>
                                    <div className="text-2xl font-bold text-slate-900 leading-none mb-1">47</div>
                                    <div className="text-[10px] text-slate-500 font-medium">Purchases Paused</div>
                                </div>
                                {/* Stat 2 */}
                                <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-50 flex flex-col items-center text-center">
                                    <div className="w-10 h-10 bg-indigo-400 rounded-full flex items-center justify-center text-white mb-3 shadow-md shadow-indigo-200">
                                        <Trophy size={18} />
                                    </div>
                                    <div className="text-2xl font-bold text-slate-900 leading-none mb-1">12</div>
                                    <div className="text-[10px] text-slate-500 font-medium">Rewards Unlocked</div>
                                </div>
                                {/* Stat 3 */}
                                <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-50 flex flex-col items-center text-center">
                                    <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white mb-3 shadow-md shadow-blue-200">
                                        <DollarSign size={18} />
                                    </div>
                                    <div className="text-2xl font-bold text-slate-900 leading-none mb-1">$2.8k</div>
                                    <div className="text-[10px] text-slate-500 font-medium">Total Saved</div>
                                </div>
                            </div>

                            {/* Goal Progress */}
                            <div className="bg-white p-6 rounded-3xl border border-slate-50 mb-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                                        <Sparkles size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-slate-400 font-medium mb-0.5">Savings Goal Progress</div>
                                        <div className="text-slate-900 font-bold">Emergency Fund 2024</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-slate-900">$2,847</div>
                                        <div className="text-xs text-slate-400 font-medium">of $5,000</div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative h-4 bg-slate-100 rounded-full w-full overflow-hidden mb-2">
                                    <div className="absolute top-0 left-0 h-full w-[56.9%] bg-gradient-to-r from-blue-300 via-indigo-300 to-rose-300 rounded-full" />
                                </div>
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-slate-500">56.9% complete</span>
                                    <span className="text-rose-400">$2,153 to go!</span>
                                </div>
                            </div>

                            {/* Bottom Message */}
                            <div className="bg-blue-50/50 rounded-2xl p-4 text-center">
                                <p className="text-xs text-slate-500 font-medium">
                                    You're <span className="text-rose-500 font-bold">$2,153</span> away from your goal. Every paused purchase brings you closer! 💖✨
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 rounded-full border border-rose-100 mb-8">
                            <Sparkles size={14} className="text-rose-400 fill-rose-400" />
                            <span className="text-xs font-bold text-slate-500">Join the WalletGlow community</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-display leading-tight">
                            Start your journey to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400">intentional spending</span>
                        </h2>

                        <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-lg">
                            Install WalletGlow today and give yourself the gift of breathing room between impulse and action.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            {[
                                "Works on 1000+ shopping sites",
                                "Chrome extension + mobile app",
                                "Privacy-first: your data stays yours",
                                "Free 7-day trial, then just $4.99/mo",
                                "ADHD-friendly design",
                                "Supportive, shame-free approach"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-rose-200 flex items-center justify-center text-white shrink-0">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    <span className="text-sm text-slate-600 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <a
                                href="#pricing"
                                className="px-8 py-4 bg-gradient-to-r from-rose-300 to-indigo-300 text-white text-lg font-bold rounded-full hover:shadow-xl hover:shadow-rose-200 hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-rose-100"
                            >
                                Start Free Trial
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <button className="px-8 py-4 bg-white text-rose-400 text-lg font-bold rounded-full border border-rose-100 hover:border-rose-200 hover:bg-rose-50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                                <Smartphone size={20} />
                                Get Mobile App
                            </button>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                            <Sparkles size={12} className="text-yellow-400 fill-yellow-400" />
                            <span>7-day free trial · Then $4.99/mo or $50 lifetime · 30-second install</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
