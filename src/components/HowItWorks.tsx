
import { MousePointerClick, Timer, Heart, Trophy } from 'lucide-react';

export const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 bg-[#fffdf9]">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">How WalletGlow works</h2>
                    <p className="text-lg text-slate-500">Four simple steps between impulse and intention.</p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-4 gap-8 relative mb-32">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-rose-100 via-purple-100 to-rose-100 -z-10" />

                    {/* Step 1 */}
                    <div className="relative pt-4 text-center group cursor-default">
                        <div className="w-8 h-8 rounded-full bg-rose-200 text-rose-500 font-bold flex items-center justify-center text-sm absolute -top-4 left-1/2 -translate-x-1/2 z-10 border-4 border-[#fffdf9] group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">01</div>
                        <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-sm border border-rose-50 flex items-center justify-center mb-6 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-rose-100/50 transition-all duration-300">
                            <MousePointerClick size={32} className="text-rose-400 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 group-hover:text-rose-500 transition-colors">You click checkout</h3>
                        <p className="text-sm text-slate-500 leading-relaxed px-4">WalletGlow gently illuminates the page before you complete your purchase.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative pt-4 text-center group cursor-default">
                        <div className="w-8 h-8 rounded-full bg-purple-200 text-purple-500 font-bold flex items-center justify-center text-sm absolute -top-4 left-1/2 -translate-x-1/2 z-10 border-4 border-[#fffdf9] group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">02</div>
                        <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-sm border border-purple-50 flex items-center justify-center mb-6 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-purple-100/50 transition-all duration-300">
                            <Timer size={32} className="text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 group-hover:text-purple-500 transition-colors">Start your 48-hour pause</h3>
                        <p className="text-sm text-slate-500 leading-relaxed px-4">A gentle timer lay overlays with a countdown timer. 80% pass by morning.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative pt-4 text-center group cursor-default">
                        <div className="w-8 h-8 rounded-full bg-indigo-200 text-indigo-500 font-bold flex items-center justify-center text-sm absolute -top-4 left-1/2 -translate-x-1/2 z-10 border-4 border-[#fffdf9] group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">03</div>
                        <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-sm border border-indigo-50 flex items-center justify-center mb-6 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-indigo-100/50 transition-all duration-300">
                            <Heart size={32} className="text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 group-hover:text-indigo-500 transition-colors">Answer Reality Check questions</h3>
                        <p className="text-sm text-slate-500 leading-relaxed px-4">Think through 10 supportive questions that help you understand your true needs.</p>
                    </div>

                    {/* Step 4 */}
                    <div className="relative pt-4 text-center group cursor-default">
                        <div className="w-8 h-8 rounded-full bg-pink-200 text-pink-500 font-bold flex items-center justify-center text-sm absolute -top-4 left-1/2 -translate-x-1/2 z-10 border-4 border-[#fffdf9] group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">04</div>
                        <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-sm border border-pink-50 flex items-center justify-center mb-6 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-pink-100/50 transition-all duration-300">
                            <Trophy size={32} className="text-rose-400 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 group-hover:text-pink-500 transition-colors">Make an empowered choice</h3>
                        <p className="text-sm text-slate-500 leading-relaxed px-4">After 48 hours, decide with clarity. Either way, you earn achievements for showing up.</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-slate-50 rounded-[2rem] p-12 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 relative overflow-hidden group hover:shadow-lg transition-shadow duration-300 cursor-default">
                    {/* Background Gradient Strip */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-200 via-purple-200 to-rose-200 group-hover:h-1.5 transition-all duration-300" />

                    <div className="text-center md:flex-1 group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                        <div className="text-4xl font-extrabold text-slate-900 mb-1">80%</div>
                        <div className="text-sm text-slate-500 font-medium">Reduction in impulse purchases</div>
                    </div>

                    <div className="hidden md:block w-px h-12 bg-slate-200 group-hover:bg-slate-300 transition-colors" />

                    <div className="text-center md:flex-1 group-hover:-translate-y-1 transition-transform duration-300 delay-100">
                        <div className="text-4xl font-extrabold text-slate-900 mb-1">$1,200</div>
                        <div className="text-sm text-slate-500 font-medium">Average savings per year / user</div>
                    </div>

                    <div className="hidden md:block w-px h-12 bg-slate-200 group-hover:bg-slate-300 transition-colors" />

                    <div className="text-center md:flex-1 group-hover:-translate-y-1 transition-transform duration-300 delay-150">
                        <div className="text-4xl font-extrabold text-slate-900 mb-1">10k+</div>
                        <div className="text-sm text-slate-500 font-medium">People taking back control</div>
                    </div>
                </div>

            </div>
        </section>
    );
};
