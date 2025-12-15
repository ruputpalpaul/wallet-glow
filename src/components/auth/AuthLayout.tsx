
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';

export function AuthLayout({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) {
    return (
        <div className="min-h-screen bg-[#fffdf9] pt-24 pb-20 px-6 flex items-center justify-center">
            <div className="w-full max-w-md">
                <a href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors mb-8 text-sm font-bold">
                    <ArrowLeft size={16} /> Back to Home
                </a>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-rose-100/50 border border-slate-100"
                >
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500">
                            <Sparkles size={20} className="fill-current" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2 font-display">{title}</h1>
                        <p className="text-slate-500 text-sm">{subtitle}</p>
                    </div>

                    {children}

                </motion.div>
            </div>
        </div>
    );
}
