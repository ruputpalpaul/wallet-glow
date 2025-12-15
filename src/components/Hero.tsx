
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Plus } from 'lucide-react';
import { LiveExtensionDemo } from './LiveExtensionDemo';

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#fffdf9]">

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Left Content */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-50 rounded-full mb-8"
                    >
                        <Heart size={14} className="text-rose-300 fill-rose-300" />
                        <span className="text-xs font-medium text-slate-500">Designed for ADHD & neurodivergent minds</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-6xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight"
                    >
                        Shop with <br />
                        <span className="text-pink-200">intention,</span> <br />
                        not impulse
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-slate-500 mb-10 max-w-lg leading-relaxed font-light"
                    >
                        WalletGlow gently pauses your online shopping, giving you time to check in with yourself before checkout. No shame, just support. 💖
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="flex flex-col sm:flex-row gap-4 mb-16">
                            <button className="px-8 py-4 bg-gradient-to-r from-rose-400 via-rose-500 to-indigo-500 text-white text-lg font-bold rounded-full hover:shadow-2xl hover:shadow-rose-300/50 hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group">
                                Add to Chrome - It's Free
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-8 py-4 bg-white text-slate-700 text-lg font-bold rounded-full border border-slate-200 hover:border-rose-200 hover:bg-rose-50/50 hover:text-rose-600 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg">
                                Download Mobile App
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-4"
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-[3px] border-[#fffdf9] bg-blue-100 overflow-hidden">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 5}&backgroundColor=b6e3f4`} alt="User" />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex gap-1 text-red-300 mb-0.5">
                                <Plus size={12} strokeWidth={4} />
                                <Plus size={12} strokeWidth={4} />
                                <Plus size={12} strokeWidth={4} />
                                <Plus size={12} strokeWidth={4} />
                                <Plus size={12} strokeWidth={4} />
                            </div>
                            <span className="text-xs text-slate-400 font-medium">Loved by 10,000+ mindful shoppers</span>
                        </div>
                    </motion.div>
                </div>

                {/* Right Content - Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <LiveExtensionDemo />
                </motion.div>

            </div>
        </section>
    );
};
