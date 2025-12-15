
import { CheckCircle2, ShieldCheck, Smartphone } from 'lucide-react';

export const CTASection = () => {
    return (
        <section className="py-24 bg-[#fffdf9]">
            <div className="max-w-7xl mx-auto px-6">

                <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">

                    {/* Background Blobs */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100/50 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/50 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

                    {/* Left Image */}
                    <div className="w-full lg:w-1/2 relative z-10 group">
                        <div className="bg-slate-50 rounded-[2rem] aspect-square relative overflow-hidden flex items-center justify-center border border-slate-100 transition-transform duration-500 group-hover:scale-[1.02]">
                            {/* Abstract Mockup Composition */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white" />
                            <div className="w-64 h-80 bg-white rounded-2xl shadow-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-slate-100 flex flex-col overflow-hidden transition-transform duration-500 group-hover:rotate-2 group-hover:scale-105">
                                <div className="h-4 bg-slate-100 w-full" />
                                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4 text-3xl">🎉</div>
                                    <div className="h-4 bg-slate-100 rounded-full w-3/4 mb-2" />
                                    <div className="h-3 bg-slate-50 rounded-full w-1/2" />
                                </div>
                                <div className="h-16 bg-slate-50 border-t border-slate-100" />
                            </div>
                            {/* Floating Elements */}
                            <div className="absolute top-1/4 left-10 bg-white p-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
                                <div className="w-2 h-2 rounded-full bg-green-400" />
                                <div className="text-xs font-bold text-slate-600">Goal Reached!</div>
                            </div>
                            <div className="absolute bottom-1/4 right-10 bg-white p-3 rounded-xl shadow-lg flex items-center gap-2 animate-pulse">
                                <div className="w-2 h-2 rounded-full bg-rose-400" />
                                <div className="text-xs font-bold text-slate-600">Impulse Blocked</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="w-full lg:w-1/2 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-full mb-6">
                            <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">Join the mindful purchasing community</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                            Start your journey to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">intentional spending</span>
                        </h2>
                        <p className="text-lg text-slate-500 mb-8">Install WalletGlow today and give yourself the gift of breathing room between impulse and action.</p>

                        <div className="grid grid-cols-2 gap-4 mb-10">
                            {[
                                "Works on 1000+ shopping sites",
                                "Delaying purchases = happy brain",
                                "Privacy first, your data stays yours",
                                "Fun features, no credit card needed",
                                "ADHD-friendly design",
                                "Supportive, shame-free approach"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 group cursor-default">
                                    <CheckCircle2 size={16} className="text-rose-500 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-4 bg-gradient-to-r from-rose-400 via-rose-500 to-indigo-500 text-white text-lg font-bold rounded-full hover:shadow-2xl hover:shadow-rose-300/50 hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl">
                                <ShieldCheck size={20} className="group-hover:rotate-12 transition-transform" />
                                Add to Chrome
                            </button>
                            <button className="px-8 py-4 bg-white text-slate-700 text-lg font-bold rounded-full border border-slate-200 hover:border-rose-200 hover:bg-rose-50/50 hover:text-rose-600 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg flex items-center justify-center gap-2">
                                <Smartphone size={20} />
                                Get Mobile App
                            </button>
                        </div>
                        <p className="text-xs text-slate-400 mt-4 text-center sm:text-left">* Free forever • No credit card required • 50k+ mindful decisions made</p>
                    </div>

                </div>
            </div>
        </section>
    );
};
