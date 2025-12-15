
import { Heart, Users, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ValueCard = ({ icon: Icon, title, description, color }: any) => (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
        <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={24} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-rose-500 transition-colors">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">
            {description}
        </p>
    </div>
);

export function AboutPage() {
    return (
        <div className="pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
                        <Heart size={12} className="text-rose-500 fill-rose-500" />
                        Our Story
                    </div>
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight">
                        About WalletGlow
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        We're building a kinder, gentler approach to financial wellness for neurodivergent minds.
                    </p>
                </div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white p-4 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 mb-20 relative overflow-hidden"
                >
                    <div className="aspect-[16/9] bg-slate-100 rounded-[2.5rem] overflow-hidden relative">
                        {/* Placeholder matching the design's clean aesthetic */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-rose-50 opacity-50" />
                        <img
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
                            alt="Team collaboration"
                            className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </motion.div>

                {/* Mission */}
                <div className="bg-gradient-to-br from-rose-50 to-indigo-50 rounded-[3rem] p-12 md:p-16 mb-24 text-center md:text-left relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
                        <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                            <p>
                                WalletGlow was born from a simple truth: traditional financial advice doesn't work for everyone. Especially not for those of us with ADHD, executive dysfunction, or other neurodivergent experiences.
                            </p>
                            <p>
                                We believe that impulse spending isn't a moral failing—it's a symptom of how our brains are wired in a world designed to hijack our attention and dopamine systems. You deserve tools that work WITH your brain, not against it.
                            </p>
                        </div>
                    </div>
                    {/* Decorative blurred blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                </div>

                {/* Values */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900">Our Values</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <ValueCard
                            icon={Heart}
                            color="bg-rose-400"
                            title="No Shame, Ever"
                            description="Financial struggles are not character flaws. We create supportive, judgment-free experiences that meet you where you are."
                        />
                        <ValueCard
                            icon={Users}
                            color="bg-indigo-400"
                            title="Neurodivergent-First Design"
                            description="Every feature is designed with ADHD and neurodivergent experiences at the center, not as an afterthought."
                        />
                        <ValueCard
                            icon={Shield}
                            color="bg-purple-400"
                            title="Privacy First"
                            description="Your financial data is deeply personal. We never sell, share, or monetize your information. Period."
                        />
                        <ValueCard
                            icon={Sparkles}
                            color="bg-pink-400"
                            title="Joyful by Design"
                            description="Financial wellness doesn’t have to be boring or punishing. We believe in beauty, play, and celebrating every small win."
                        />
                    </div>
                </div>

                {/* Team / Built By */}
                <div className="bg-slate-50 rounded-[3rem] p-12 md:p-16 text-center md:text-left border border-slate-100">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Built by People Like You</h2>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                        WalletGlow is created by a small, dedicated team of designers, developers, and behavioral psychologists—many of whom are neurodivergent themselves.
                    </p>
                    <div className="h-6" />
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                        We understand the 2 AM shopping sprees, the dopamine-seeking clicks, and the shame spiral that follows. We've been there. That's why we're building the tool we wish existed when we needed it most.
                    </p>

                    <div className="mt-12 flex justify-center md:justify-start">
                        <button className="bg-rose-200 text-rose-700 px-8 py-3 rounded-full font-bold hover:bg-rose-300 transition-colors flex items-center gap-2">
                            <Heart size={20} className="fill-current" />
                            Join Our Community
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
