import { useEffect } from 'react';
import { XCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export function PaymentCancel() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-32 pb-20 px-6 min-h-[80vh] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg w-full bg-white rounded-[2.5rem] p-8 md:p-12 text-center shadow-xl shadow-slate-100 border border-slate-100"
            >
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                    <XCircle size={40} />
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-4 font-display">Order Cancelled</h1>
                <p className="text-slate-500 mb-8 leading-relaxed">
                    No worries! No charge was made. Whenever you're ready to start your journey, we'll be here. 💖
                </p>

                <a href="#pricing" className="block w-full py-4 rounded-xl bg-slate-900 text-white font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                    <ArrowLeft size={20} />
                    Return to Pricing
                </a>
            </motion.div>
        </div>
    );
}
