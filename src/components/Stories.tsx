import { Star } from 'lucide-react';

const StoryCard = ({ quote, author, role, color }: any) => (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-default">
        <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={14} className="text-rose-400 fill-rose-400 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
            ))}
        </div>
        <p className="text-slate-600 mb-6 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">"{quote}"</p>
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300`}>
                {author.charAt(0)}
            </div>
            <div>
                <div className="font-bold text-slate-900 text-sm">{author}</div>
                <div className="text-xs text-slate-400 group-hover:text-rose-400 transition-colors">{role}</div>
            </div>
        </div>
    </div>
);

export const Stories = () => {
    return (
        <section id="stories" className="py-24 bg-[#fffdf9]">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Star size={14} className="text-rose-400 fill-rose-400" />
                        <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Real stories, real change</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">You're not alone in this</h2>
                    <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">Join thousands of people who are building a healthier relationship with money and shopping.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StoryCard
                        quote="As someone with ADHD, online shopping was my biggest struggle. WalletGlow doesn't fake me feel broken - it just gives me the pause I need. I've saved over $300 in two months!"
                        author="Sarah M."
                        role="UX Designer"
                        color="bg-rose-400"
                    />
                    <StoryCard
                        quote="The Reality Check questions literally stop me mid-scroll. asking 'Is this for my future self or my present dopamine?' hits different. Love it."
                        author="Alex K."
                        role="Student"
                        color="bg-indigo-400"
                    />
                    <StoryCard
                        quote="The dopamine menu is genius! When I get the urge to shop, I just check it for a quick dance break or drawing a 5 minute doodle. My credit card debt is finally going down."
                        author="Jessica C."
                        role="Freelance Writer"
                        color="bg-purple-400"
                    />
                    <StoryCard
                        quote="Finally an app that doesn't shame you for spending money, but helps you spend it on things that actually matter. The gamification makes saving fun."
                        author="Michael T."
                        role="Teacher"
                        color="bg-blue-400"
                    />
                    <StoryCard
                        quote="The trigger mapping feature showed me I always shop when I'm stressed at work. Now I use the pattern recognition to plan self-care instead. Game changer."
                        author="Priya R."
                        role="Marketing"
                        color="bg-orange-400"
                    />
                    <StoryCard
                        quote="I love that it opens on mobile too! The aesthetic is so calming and beautiful. It doesn't feel like punishment, it feels like self-care. Already addicted to achievements!"
                        author="Emma W."
                        role="Artist"
                        color="bg-pink-400"
                    />
                </div>

            </div>
        </section>
    );
};
