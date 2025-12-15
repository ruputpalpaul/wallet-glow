import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Brain, Wallet, Shield, Zap } from 'lucide-react';
import { Card } from './Card';

export function LearnPage() {
    const [expandedModule, setExpandedModule] = useState<string | null>('adhd');

    const modules = [
        {
            id: 'budgeting',
            title: 'Budgeting 101: The Soft Life Edition',
            subtitle: 'Learn how to budget without the shame spiral',
            icon: Wallet,
            iconColor: 'bg-pink-bg-subtle text-pink-emphasis',
            duration: '5 min read',
            completed: true,
            content: null // Placeholder for now
        },
        {
            id: 'adhd',
            title: 'Money & ADHD: Understanding Your Brain',
            subtitle: 'Why impulse spending happens + what actually helps',
            icon: Brain,
            iconColor: 'bg-[#F3E8FF] text-[#C4B5FD]',
            duration: '7 min read',
            completed: false,
            content: (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div>
                        <h4 className="flex items-center gap-2 font-medium text-text-emphasis mb-3">
                            <BookOpen size={16} className="text-pink-emphasis" />
                            What You'll Learn
                        </h4>
                        <ul className="space-y-3">
                            {[
                                "ADHD brains seek dopamine - shopping provides instant gratification. This is neurological, not a character flaw.",
                                'The "now vs. not-now" time blindness makes future consequences feel abstract.',
                                "Rejection sensitivity can trigger retail therapy when you're feeling down.",
                                "Executive dysfunction makes budgeting feel impossible - you need systems, not willpower.",
                                "Hyperfocus can lead to research spirals that end in checkout pages."
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-text-muted leading-relaxed">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E0F2FE] text-[#3B82F6] flex items-center justify-center text-[10px] font-bold">
                                        {idx + 1}
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-pink-bg-subtle rounded-2xl p-5">
                        <h4 className="flex items-center gap-2 font-bold text-text-emphasis mb-3 text-sm">
                            <SparklesIcon /> Action Steps
                        </h4>
                        <ul className="space-y-2 text-sm text-text-muted">
                            <li className="flex gap-2">🧠 Add friction to spending: delete saved cards, use cash</li>
                            <li className="flex gap-2">⏰ Set purchase timers (like this app!) to interrupt impulse</li>
                            <li className="flex gap-2">📝 Keep a "Why I Bought This" journal to spot patterns</li>
                            <li className="flex gap-2">💕 Find dopamine alternatives: playlists, walks, texting a friend</li>
                        </ul>
                    </div>

                    <button className="w-full bg-pink-emphasis text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity border-none cursor-pointer shadow-lg shadow-pink-200">
                        Mark as Complete ✨
                    </button>
                </div>
            )
        },
        {
            id: 'debt',
            title: 'Getting Out of Debt (Gently)',
            subtitle: 'Practical strategies without the Dave Ramsey energy',
            icon: CreditCardIcon,
            iconColor: 'bg-[#E0F2FE] text-[#3B82F6]',
            duration: '6 min read',
            completed: false,
            content: null
        },
        {
            id: 'emergency',
            title: 'Building Your "Oh Sh*t" Fund',
            subtitle: 'Emergency savings for real life emergencies',
            icon: Shield,
            iconColor: 'bg-pink-bg-subtle text-pink-emphasis',
            duration: '5 min read',
            completed: false,
            content: null
        },
        {
            id: 'psych',
            title: 'The Psychology of Spending',
            subtitle: 'Understanding your emotional triggers',
            icon: HeartIcon,
            iconColor: 'bg-[#FFE4E6] text-[#FDA4AF]',
            duration: '8 min read',
            completed: false,
            content: null
        },
        {
            id: 'strategies',
            title: 'Savings Strategies That Actually Work',
            subtitle: 'Make saving automatic and painless',
            icon: PiggyIcon,
            iconColor: 'bg-[#E0F2FE] text-[#3B82F6]',
            duration: '6 min read',
            completed: false,
            content: null
        },
        {
            id: 'smarter',
            title: 'Shopping Smarter, Not Harder',
            subtitle: 'How to spend intentionally when you do buy',
            icon: TargetIcon,
            iconColor: 'bg-[#F3E8FF] text-[#C4B5FD]',
            duration: '5 min read',
            completed: false,
            content: null
        }
    ];

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-12">
            <div>
                <h1 className="text-text-emphasis mb-2 text-2xl font-bold flex items-center gap-2">
                    Financial Education 💖
                </h1>
                <p className="text-text-muted">Learn at your own pace - no shame, just support</p>
            </div>

            {/* Progress Card */}
            <Card className="bg-bg-dark border border-border-subtle p-6 rounded-3xl">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-pink-bg-subtle flex items-center justify-center text-pink-emphasis">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-text-emphasis m-0">Your Learning Journey</h2>
                            <p className="text-sm text-text-muted m-0">1 of 9 lessons completed</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-pink-emphasis">11%</div>
                        <div className="text-[10px] text-text-muted uppercase tracking-wider">Complete</div>
                    </div>
                </div>
                <div className="w-full bg-pink-bg-subtle h-3 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-emphasis w-[11%] rounded-full" />
                </div>
            </Card>

            {/* Quick Win */}
            <Card className="bg-gradient-to-r from-[#FFF0F5] to-[#F3E8FF] border-none p-6 rounded-3xl shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/50 rounded-xl backdrop-blur-sm">
                        <Zap className="text-pink-emphasis" size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-text-emphasis mb-1 flex items-center gap-2">
                            Quick Win 💡
                        </h3>
                        <p className="text-sm text-text-default leading-relaxed m-0">
                            <strong>Right now action:</strong> Open your banking app and set up ONE automatic transfer of $10 to savings. Just $10. That's it. You did something good for Future You. ✨
                        </p>
                    </div>
                </div>
            </Card>

            {/* Modules List */}
            <div className="space-y-4">
                {modules.map((module) => (
                    <Card
                        key={module.id}
                        className={`bg-bg-dark border border-border-subtle rounded-3xl overflow-hidden transition-all duration-300 ${expandedModule === module.id ? 'shadow-md ring-1 ring-pink-border' : 'hover:scale-[1.01]'
                            }`}
                    >
                        <button
                            onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                            className="w-full p-6 flex items-center justify-between bg-transparent border-none cursor-pointer text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${module.iconColor}`}>
                                    <module.icon size={24} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-base font-bold text-text-emphasis m-0">{module.title}</h3>
                                        {module.completed && (
                                            <span className="bg-pink-emphasis text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                ✓ Done
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-text-muted m-0">{module.subtitle}</p>
                                    <div className="text-xs text-text-muted mt-1 font-medium md:hidden">
                                        {module.duration}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xs text-pink-emphasis font-medium hidden md:block">
                                    {module.duration}
                                </span>
                                {expandedModule === module.id ? (
                                    <ChevronUp className="text-text-muted" size={20} />
                                ) : (
                                    <ChevronDown className="text-text-muted" size={20} />
                                )}
                            </div>
                        </button>

                        {expandedModule === module.id && module.content && (
                            <div className="px-6 pb-6 pt-2 border-t border-border-subtle/50">
                                {module.content}
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
}

// Icon Components Helper
function SparklesIcon() {
    return <Zap size={14} className="text-pink-emphasis fill-pink-emphasis" />;
}
function CreditCardIcon(props: any) { return <Wallet {...props} />; }
function HeartIcon(props: any) { return <Brain {...props} />; } // Placeholder mapping
function PiggyIcon(props: any) { return <Wallet {...props} />; } // Placeholder mapping
function TargetIcon(props: any) { return <Brain {...props} />; } // Placeholder mapping
