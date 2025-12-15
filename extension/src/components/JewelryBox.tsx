import { Lock, Flame, Star } from 'lucide-react';
import { Card } from './Card';

export function JewelryBox({ onClose }: { onClose: () => void }) {
    // Mock data based on the image
    const collectibles = [
        { id: 1, name: 'Diamond Gem', icon: '💎', unlocked: true, bg: 'bg-[#E0F2FE]' },
        { id: 2, name: 'Royal Tiara', icon: '👑', unlocked: true, bg: 'bg-[#FFF0F5]' },
        { id: 3, name: '30 Day Streak', icon: Lock, unlocked: false, bg: 'bg-[#F8FAFC]', subtitle: '30 Day Streak' },
        { id: 4, name: 'Flying Piggy', icon: '🐷', unlocked: true, bg: 'bg-[#FFF0F5]' },
        { id: 5, name: 'Sapphire Ring', icon: '💍', unlocked: true, bg: 'bg-[#E0F2FE]' },
        { id: 6, name: 'Save $2,000', icon: Lock, unlocked: false, bg: 'bg-[#F8FAFC]', subtitle: 'Save $2,000' },
        { id: 7, name: '10 Purchases Avoided', icon: Lock, unlocked: false, bg: 'bg-[#F8FAFC]', subtitle: '10 Purchases Avoided' },
        { id: 8, name: 'Complete 50 Questions', icon: Lock, unlocked: false, bg: 'bg-[#F8FAFC]', subtitle: 'Complete 50 Questions' },
        { id: 9, name: 'Set 5 Goals', icon: Lock, unlocked: false, bg: 'bg-[#F8FAFC]', subtitle: 'Set 5 Goals' }
    ];

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-12 pt-4">
            {/* Header with Close for Modal mode if needed, although user asked for 'Page' */}
            <div className="flex justify-between items-end mb-2">
                <div>
                    <h1 className="text-text-emphasis mb-2 text-2xl font-bold flex items-center gap-3">
                        My Glow Up Collection ✨
                    </h1>
                    <p className="text-text-muted">4 of 9 collectibles unlocked</p>
                </div>
                {onClose && (
                    <button onClick={onClose} className="text-text-muted hover:text-pink-emphasis">
                        Close
                    </button>
                )}
            </div>

            {/* Progress Bar Card */}
            <Card className="bg-white p-6 rounded-3xl shadow-sm border border-border-subtle">
                <div className="flex justify-between text-sm font-medium mb-3">
                    <span className="text-text-emphasis">Collection Progress</span>
                    <span className="text-pink-emphasis font-bold">44%</span>
                </div>
                <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-300 to-purple-300 w-[44%] rounded-full" />
                </div>
                <p className="text-xs text-text-muted mt-3">
                    Next Reward: 50% to the 'Gold Trophy'
                </p>
            </Card>

            {/* Collectibles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collectibles.map((item) => (
                    <Card
                        key={item.id}
                        className={`aspect-square flex flex-col items-center justify-center p-8 rounded-[2rem] border border-border-subtle transition-transform hover:scale-[1.02] ${item.bg}`}
                    >
                        {item.unlocked ? (
                            <>
                                <div className="text-6xl mb-4 filter drop-shadow-md pb-4">
                                    {typeof item.icon === 'string' ? item.icon : <item.icon size={48} />}
                                </div>
                                <h3 className="text-sm font-medium text-text-emphasis">{item.name}</h3>
                            </>
                        ) : (
                            <>
                                <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mb-4 pb-1">
                                    <Lock className="text-text-muted" size={24} />
                                </div>
                                <h3 className="text-xs text-text-muted font-medium">{item.subtitle}</h3>
                            </>
                        )}
                        {/* Decorative Sparkles for unlocked items */}
                        {item.unlocked && (
                            <div className="absolute top-4 right-4 text-yellow-400">✨</div>
                        )}
                    </Card>
                ))}
            </div>

            {/* Bottom Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-[#FFF0F5] p-4 rounded-2xl text-center">
                    <div className="text-2xl mb-1">💎</div>
                    <div className="text-lg font-bold text-text-emphasis">4</div>
                    <div className="text-xs text-text-muted">Unlocked</div>
                </div>
                <div className="bg-[#E0F2FE] p-4 rounded-2xl text-center">
                    <div className="text-2xl mb-1 flex justify-center"><Flame className="text-orange-400 fill-orange-400" /></div>
                    <div className="text-lg font-bold text-text-emphasis">12</div>
                    <div className="text-xs text-text-muted">Day Streak</div>
                </div>
                <div className="bg-[#F3E8FF] p-4 rounded-2xl text-center">
                    <div className="text-2xl mb-1 flex justify-center text-green-500">💰</div>
                    <div className="text-lg font-bold text-text-emphasis">$450</div>
                    <div className="text-xs text-text-muted">Saved</div>
                </div>
                <div className="bg-[#FEF9C3] p-4 rounded-2xl text-center">
                    <div className="text-2xl mb-1 flex justify-center"><Star className="text-yellow-500 fill-yellow-500" /></div>
                    <div className="text-lg font-bold text-text-emphasis">+150</div>
                    <div className="text-xs text-text-muted">XP Earned</div>
                </div>
            </div>
        </div>
    );
}
