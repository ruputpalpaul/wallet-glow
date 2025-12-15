import { useState, useEffect } from 'react';
import { Sparkles, Clock, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const LiveExtensionDemo = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 47,
        minutes: 23,
        seconds: 29
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const TimerBox = ({ value, label }: { value: number, label: string }) => (
        <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-rose-100 flex items-center justify-center mb-2">
                <span className="text-3xl font-light text-slate-800 font-mono">
                    {value.toString().padStart(2, '0')}
                </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">{label}</span>
        </div>
    );

    return (
        <div className="relative">
            {/* Main Extension Window Mockup */}
            <div className="bg-[#fffdf9] rounded-[40px] p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-white relative z-10 max-w-md mx-auto aspect-[4/5] flex flex-col items-center justify-center text-center overflow-hidden">

                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[150%] h-[50%] bg-gradient-to-b from-rose-50/80 to-transparent rounded-full blur-3xl opacity-60" />
                </div>

                {/* Floating Badge */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-8 right-8 bg-white px-4 py-2 rounded-full shadow-md border border-rose-100 flex items-center gap-2 z-20"
                >
                    <div className="w-5 h-5 bg-rose-200 rounded-full flex items-center justify-center">
                        <Sparkles size={12} className="text-rose-600 fill-rose-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-600">WalletGlow Active</span>
                </motion.div>

                {/* Content */}
                <div className="relative z-10 w-full">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center justify-center gap-2">
                        Take a breath <Heart className="text-rose-400 fill-rose-400" size={20} />
                    </h2>
                    <p className="text-slate-500 text-sm mb-12 max-w-xs mx-auto">
                        Let's pause before this purchase and check in with yourself
                    </p>

                    {/* Timer Section */}
                    <div className="bg-rose-50/50 rounded-3xl p-6 mb-8 border border-rose-100/50">
                        <div className="flex items-center justify-center gap-2 text-rose-400 text-sm font-medium mb-6">
                            <Clock size={16} />
                            Cooling off period
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <TimerBox value={timeLeft.hours} label="hours" />
                            <span className="text-2xl text-rose-300 -mt-6">:</span>
                            <TimerBox value={timeLeft.minutes} label="mins" />
                            <span className="text-2xl text-rose-300 -mt-6">:</span>
                            <TimerBox value={timeLeft.seconds} label="secs" />
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-2 px-2">
                            <span className="text-xs font-medium text-slate-500">Reality Check Progress</span>
                            <span className="text-xs font-bold text-rose-400">0/10</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-rose-300 to-rose-400 rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "5%" }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                        <div className="flex justify-between mt-3 px-2">
                            {[...Array(10)].map((_, i) => (
                                <Heart key={i} size={12} className="text-slate-200" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Overlay Gradient */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-indigo-50/50 to-transparent pointer-events-none" />
            </div>

            {/* Floating Stats Card - Impulse Avoided */}
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-12 -left-8 bg-white p-5 pr-10 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-rose-50 flex items-center gap-5 z-20 animate-bounce-slow"
            >
                <div className="w-14 h-14 bg-gradient-to-br from-rose-200 to-rose-100 rounded-full flex items-center justify-center shadow-inner">
                    <Heart size={28} className="text-rose-500 fill-white" />
                </div>
                <div>
                    <div className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Impulses avoided</div>
                    <div className="text-2xl font-extrabold text-slate-900 tracking-tight">$2,847</div>
                </div>
            </motion.div>
        </div>
    );
};
