import { Heart, Shield, Sparkles, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export function AboutPage() {
    return (
        <div className="bg-[#fffdf7] min-h-screen pt-32 pb-24">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto px-6 text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 bg-[#fff0f5] text-rose-500 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-rose-100"
                >
                    <Heart size={14} className="fill-current" />
                    Our Story
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-display">
                    About WalletGlow
                </h1>

                <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                    We're building a kinder, gentler approach to financial wellness for neurodivergent minds.
                </p>
            </div>

            {/* Mission Card */}
            <div className="max-w-5xl mx-auto px-6 mb-24">
                <div className="bg-[#fff0f5] rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden">
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Mission</h2>
                        <p className="text-slate-600 leading-loose text-lg">
                            WalletGlow was born from a simple truth: traditional financial advice doesn't work for everyone.
                            Especially not for those of us with ADHD, executive dysfunction, or other neurodivergent experiences.
                            <br /><br />
                            We believe that impulse spending isn't a moral failing—it's a symptom of how our brains are wired
                            in a world designed to hijack our attention and dopamine systems. You deserve tools that work
                            WITH your brain, not against it.
                        </p>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="max-w-6xl mx-auto px-6 mb-24">
                <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">Our Values</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Value 1 */}
                    <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-rose-100/50 rounded-2xl flex items-center justify-center text-rose-500 mb-6">
                            <Heart size={24} className="fill-rose-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">No Shame, Ever</h3>
                        <p className="text-slate-500 leading-relaxed">
                            Financial struggles are not character flaws. We create supportive, judgment-free experiences that meet you where you are.
                        </p>
                    </div>

                    {/* Value 2 */}
                    <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100/50 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                            <Users size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Neurodivergent-First Design</h3>
                        <p className="text-slate-500 leading-relaxed">
                            Every feature is designed with ADHD and neurodivergent experiences at the center, not as an afterthought.
                        </p>
                    </div>

                    {/* Value 3 */}
                    <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-indigo-100/50 rounded-2xl flex items-center justify-center text-indigo-500 mb-6">
                            <Shield size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Privacy First</h3>
                        <p className="text-slate-500 leading-relaxed">
                            Your financial data is deeply personal. We never sell, share, or monetize your information. Period.
                        </p>
                    </div>

                    {/* Value 4 */}
                    <div className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-pink-100/50 rounded-2xl flex items-center justify-center text-pink-500 mb-6">
                            <Sparkles size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Joyful by Design</h3>
                        <p className="text-slate-500 leading-relaxed">
                            Financial wellness doesn't have to be boring or punishing. We believe in beauty, play, and celebrating every small win.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team/Community Section */}
            <div className="max-w-5xl mx-auto px-6 pb-20">
                <div className="bg-[#fff0f5] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Built by People Like You</h2>
                        <p className="text-slate-600 leading-loose text-lg mb-10">
                            WalletGlow is created by a small, dedicated team of designers, developers, and behavioral psychologists—many of whom are neurodivergent themselves.
                            <br /><br />
                            We understand the 2 AM shopping sprees, the dopamine-seeking clicks, and the shame spiral that follows. We've been there. That's why we're building the tool we wish existed when we needed it most.
                        </p>
                        <a href="#signup" className="inline-flex items-center justify-center px-8 py-4 bg-rose-400 hover:bg-rose-500 text-white rounded-2xl font-bold transition-all transform hover:scale-[1.02] shadow-lg shadow-rose-200">
                            Join Our Community
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
