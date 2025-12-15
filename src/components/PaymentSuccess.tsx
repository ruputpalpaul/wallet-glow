import { useEffect } from 'react';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function PaymentSuccess() {
    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-32 pb-20 px-6 min-h-[80vh] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg w-full bg-white rounded-[2.5rem] p-8 md:p-12 text-center shadow-xl shadow-rose-100 border border-slate-100"
            >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 animate-bounce">
                    <CheckCircle size={40} className="fill-current" />
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-4 font-display">Payment Successful! 🎉</h1>
                <p className="text-slate-500 mb-8 leading-relaxed">
                    Thank you so much for joining WalletGlow! Your support means the world to us. You're now one step closer to mindful spending. 💖
                </p>

                <div className="space-y-4">
                    <a href="https://chrome.google.com/webstore/detail/your-extension-id" target="_blank" rel="noopener noreferrer" className="block w-full py-4 rounded-xl bg-gradient-to-r from-rose-400 to-rose-500 text-white font-bold shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                        <Download size={20} />
                        Download Extension
                    </a>

                    <a href="/" className="block w-full py-4 rounded-xl bg-slate-50 text-slate-600 font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                        Go to Home <ArrowRight size={16} />
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
