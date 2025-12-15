
import { Shield, MessageCircle, Clock, Sparkles, TrendingUp, Trophy } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, color }: any) => (
    <div className="group p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-default relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-[0.03] rounded-bl-[100px] pointer-events-none group-hover:scale-150 transition-transform duration-700 ease-out`} />

        <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
            <Icon size={24} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-rose-500 transition-colors duration-300">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-sm">
            {description}
        </p>
    </div>
);

export const Features = () => {
    return (
        <section id="features" className="py-24 bg-[#fffdf9]">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 rounded-full mb-4">
                        <Sparkles size={12} className="text-rose-400" />
                        <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Backed by Science</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Your gentle financial guardian</h2>
                    <p className="text-lg text-slate-500">WalletGlow combines behavioral psychology with ADHD-friendly design to support your financial wellness journey.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={Shield}
                        color="bg-rose-400"
                        title="Gentle Intercept"
                        description="We pause checkout pages with a calming overlay. No shame, just a gentle safety buffer."
                    />
                    <FeatureCard
                        icon={MessageCircle}
                        color="bg-indigo-400"
                        title="Reality Check Questions"
                        description="Three simple questions that help you understand what you really need right now."
                    />
                    <FeatureCard
                        icon={Clock}
                        color="bg-blue-400"
                        title="48-Hour Cooling Off"
                        description="Start a countdown timer. 80% of impulses pass within that time. Your future self will thank you."
                    />
                    <FeatureCard
                        icon={Sparkles}
                        color="bg-pink-400"
                        title="Dopamine Menu"
                        description="Get alternative ideas for a vibe check: movement, connection, creativity - instant joy."
                    />
                    <FeatureCard
                        icon={TrendingUp}
                        color="bg-sky-400"
                        title="Pattern Recognition"
                        description="Visualize your triggers without shame. Learn spending patterns and find your balance."
                    />
                    <FeatureCard
                        icon={Trophy}
                        color="bg-purple-400"
                        title="Unlock Achievements"
                        description="Gamify your digital detox. Earn XP and trophies. Celebrate every win, no matter how small."
                    />
                </div>

            </div>
        </section>
    );
};
