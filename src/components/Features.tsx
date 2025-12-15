
import { Clock, Sparkles, ShoppingCart, Heart } from 'lucide-react';

const features = [
    {
        title: "The Pause",
        description: "A gentle intervention that detects shopping carts and asks: \"Do you really need this right now?\"",
        icon: ShoppingCart,
        color: "bg-rose-100 text-rose-500",
        shadow: "shadow-rose-100"
    },
    {
        title: "Wishlist Buffer",
        description: "Instead of buying, save items to a 24-hour cooling-off list. 80% of impulses fade by then.",
        icon: Clock,
        color: "bg-orange-100 text-orange-500",
        shadow: "shadow-orange-100"
    },
    {
        title: "Jewelry Box",
        description: "Watch your savings turn into digital gems. Gamify your financial wellness.",
        icon: Sparkles,
        color: "bg-indigo-100 text-indigo-500",
        shadow: "shadow-indigo-100"
    },
    {
        title: "Mindful Metrics",
        description: "See how your mood affects your spending with simple clarity, not complex charts.",
        icon: Heart,
        color: "bg-emerald-100 text-emerald-500",
        shadow: "shadow-emerald-100"
    }
];

export const Features = () => {
    return (
        <section id="features" className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-rose-50 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-[#fff0f5] text-rose-500 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-rose-100 hover:border-rose-200 transition-colors cursor-default">
                        <Sparkles size={14} className="fill-current" />
                        Features
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-display">
                        Designed for your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">beautiful brain</span>
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed">
                        Traditional budgeting apps feel like homework. WalletGlow feels like a deep breath.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-8 rounded-[2rem] bg-[#fffdf9] border border-slate-100 hover:border-rose-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm ${feature.shadow}`}>
                                <feature.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-rose-500 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-500 leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
