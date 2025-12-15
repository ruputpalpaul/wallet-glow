import { Heart, Shield, Sparkles, Users } from 'lucide-react';

export function AboutPage() {
    return (
        <div className="pt-24 pb-20">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto px-6 text-center mb-20">
                <h1 className="text-4xl md:text-5xl font-bold text-rose-950 mb-6">
                    We're on a mission to bring <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">mindful spending</span> to everyone.
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                    WalletGlow isn't just a budget app. It's a digital companion designed to help you pause, reflect, and make purchase decisions that align with your true happiness.
                </p>
            </div>

            {/* Values Grid */}
            <div className="max-w-6xl mx-auto px-6 mb-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: Heart, title: "Empathy First", desc: "We understand that impulse spending is emotional, not just financial." },
                        { icon: Shield, title: "Privacy Focused", desc: "Your financial data is yours alone. We don't sell it to advertisers." },
                        { icon: Sparkles, title: "Joyful Design", desc: "Finance doesn't have to be boring. We believe in beauty and delight." },
                        { icon: Users, title: "Community Driven", desc: "We are building for a generation that wants to do better, together." }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-rose-100 shadow-sm hover:shadow-md transition-all text-center">
                            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-rose-500">
                                <item.icon size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 mb-2">{item.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Story Section */}
            <div className="bg-white py-20 border-y border-rose-50">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <div className="aspect-square rounded-full bg-rose-100 overflow-hidden relative border-4 border-white shadow-xl">
                                <img
                                    src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80"
                                    alt="Team working"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold text-rose-900 mb-6">Our Story</h2>
                            <div className="space-y-4 text-slate-600 leading-relaxed">
                                <p>
                                    It started with a late-night scrolling session and a cart full of things we didn't need. We realized that the internet is designed to make us buy, often bypassing our better judgment.
                                </p>
                                <p>
                                    We built WalletGlow to be the pause button we wished we had. A gentle intervention that brings consciousness back to consumption.
                                </p>
                                <p>
                                    Today, we're helping thousands of people save money, reduce clutter, and find joy in what they already have.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Callout */}
            <div className="max-w-4xl mx-auto px-6 text-center mt-20">
                <h2 className="text-2xl font-bold text-rose-900 mb-4">Join us on this journey</h2>
                <p className="text-slate-600 mb-8">
                    We're just getting started, and we'd love to have you with us.
                </p>
                <a
                    href="#signup"
                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-slate-800 transition-all hover:scale-105"
                >
                    Get Started Free <Sparkles size={16} />
                </a>
            </div>
        </div>
    );
}
