import { useState, useEffect } from 'react';
import { Brain, Settings, Heart, Flame, Clock, Trash2, X, Music, Archive, Puzzle, Book, Coffee, MessageCircle, Lightbulb, ArrowLeft, Wind, Hand, HeartHandshake, Smile, Sparkles } from 'lucide-react';
import { storage, type BlockState } from '../lib/storage';

import { ToastProvider, useToast } from './Toast';

function PopupContent() {
    const { showToast } = useToast();
    const [streak, setStreak] = useState(0);
    const [savings, setSavings] = useState(0);
    const [view, setView] = useState<'home' | 'wishlist' | 'dopamine' | 'spiral'>('home');
    const [items, setItems] = useState<BlockState[]>([]);

    useEffect(() => {
        // Global Error Listener
        const handleError = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            showToast(detail.message, 'error');
        };
        window.addEventListener('walletglow-error', handleError);
        return () => window.removeEventListener('walletglow-error', handleError);
    }, [showToast]);

    useEffect(() => {
        // Load stats from storage
        const loadData = async () => {
            try {
                const stats = await storage.getStats();
                setStreak(stats.streak);
                setSavings(stats.moneySaved);

                const savedItems = await storage.getItems();
                setItems(savedItems);
            } catch (e) {
                showToast("Failed to load data", 'error');
            }
        };
        loadData();
    }, []);

    const handleOpenDashboard = () => {
        chrome.runtime.sendMessage({ action: "open_dashboard" });
    };


    const handleRemoveItem = async (url: string) => {
        await storage.removeItem(url);
        // Refresh items
        const savedItems = await storage.getItems();
        setItems(savedItems);
        // Update stats
        const stats = await storage.getStats();
        setStreak(stats.streak);
        setSavings(stats.moneySaved);
    };

    const getDomain = (url: string) => {
        try {
            return new URL(url).hostname.replace('www.', '');
        } catch {
            return 'Unknown Site';
        }
    };

    if (view === 'wishlist') {
        const totalValue = items.reduce((sum, item) => sum + (item.price || 0), 0);

        return (
            <div className="w-[350px] bg-bg-darkest p-6 font-sans min-h-[500px] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Heart className="text-pink-emphasis" size={20} fill="currentColor" />
                        <h2 className="text-text-emphasis font-bold text-lg m-0">Cooling Off Wishlist</h2>
                    </div>
                    <button
                        onClick={() => setView('home')}
                        className="p-1 rounded-full hover:bg-bg-mid text-text-muted border-none cursor-pointer transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Info Banner */}
                <div className="bg-pink-bg-subtle rounded-2xl p-4 mb-6">
                    <p className="text-text-emphasis text-sm leading-relaxed m-0">
                        These items are on a 48-hour timeout. Take this time to reflect if you really need them. 💭✨
                    </p>
                </div>

                {/* Scrollable List */}
                <div className="space-y-4 flex-1 overflow-y-auto pb-4">
                    {items.length === 0 ? (
                        <div className="text-center py-12 text-text-muted">
                            <p>No items in cooling off period.</p>
                            <p className="text-xs mt-2">Your wallet is happy! 💖</p>
                        </div>
                    ) : (
                        items.map((item, idx) => {
                            // Calculate detailed time left
                            const now = Date.now();
                            const diff = now - item.timestamp;
                            const totalMs = (48 * 60 * 60 * 1000) - diff;

                            let hours = 0, mins = 0, secs = 0;
                            if (totalMs > 0) {
                                hours = Math.floor(totalMs / (1000 * 60 * 60));
                                mins = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
                                secs = Math.floor((totalMs % (1000 * 60)) / 1000);
                            }

                            return (
                                <div key={idx} className="bg-bg-dark p-5 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-border-subtle relative">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-text-emphasis font-bold text-base m-0 pr-8 leading-tight">
                                            {getDomain(item.url)} Item
                                        </h3>
                                        <button
                                            onClick={() => handleRemoveItem(item.url)}
                                            className="absolute top-5 right-5 text-text-muted hover:text-pink-emphasis bg-transparent border-none cursor-pointer transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div className="text-pink-emphasis font-bold text-lg mb-4">
                                        ${item.price?.toFixed(2) || '0.00'}
                                    </div>

                                    {/* Timer Box */}
                                    <div className="bg-[#F0F9FF] rounded-xl p-3">
                                        <div className="flex items-center gap-2 mb-2 text-text-muted text-xs">
                                            <Clock size={12} />
                                            <span>Time remaining:</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-pink-emphasis text-center">
                                            <div>
                                                <div className="text-xl font-bold leading-none">{hours}</div>
                                                <div className="text-[10px] text-text-muted mt-1">hours</div>
                                            </div>
                                            <span className="text-lg font-bold -mt-3">:</span>
                                            <div>
                                                <div className="text-xl font-bold leading-none">{mins.toString().padStart(2, '0')}</div>
                                                <div className="text-[10px] text-text-muted mt-1">min</div>
                                            </div>
                                            <span className="text-lg font-bold -mt-3">:</span>
                                            <div>
                                                <div className="text-xl font-bold leading-none">{secs.toString().padStart(2, '0')}</div>
                                                <div className="text-[10px] text-text-muted mt-1">sec</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Total Value Footer */}
                <div className="bg-[#F8FAFC] rounded-2xl p-4 flex items-center justify-between mt-2">
                    <div>
                        <div className="text-text-emphasis font-medium text-sm">Total Value Cooling</div>
                        <div className="text-text-muted text-[10px]">Mindful pause in action</div>
                    </div>
                    <div className="text-[#C4B5FD] font-bold text-xl">
                        ${totalValue.toFixed(2)}
                    </div>
                </div>
            </div>
        );
    }

    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
    const [timerActive, setTimerActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    // Timer Logic
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setTimerActive(false);
        }
        return () => clearInterval(interval);
    }, [timerActive, timeLeft]);

    const startTimer = (minutes: number) => {
        setTimeLeft(minutes * 60);
        setTimerActive(true);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Zen Grid Component (Simple Tetris/Pop alternative)
    const ZenGrid = () => {
        const [grid, setGrid] = useState(Array(64).fill(false)); // 8x8 grid

        const toggleCell = (idx: number) => {
            const newGrid = [...grid];
            newGrid[idx] = !newGrid[idx];
            setGrid(newGrid);
        };

        return (
            <div className="grid grid-cols-8 gap-1 mb-4">
                {grid.map((active, idx) => (
                    <div
                        key={idx}
                        onClick={() => toggleCell(idx)}
                        className={`aspect-square rounded-md cursor-pointer transition-all duration-300 ${active ? 'bg-[#C4B5FD] scale-90' : 'bg-bg-mid hover:bg-info-bg'
                            }`}
                    />
                ))}
            </div>
        );
    };

    // Friend Prompt Component
    const FriendPrompt = () => {
        const prompts = [
            "Send a meme you think they'd like!",
            "Ask: 'How's your week going really?'",
            "Share a song you're obsessed with right now.",
            "Ask: 'What's the best thing you ate lately?'",
            "Send a random 'Thinking of you!' text."
        ];
        const [prompt, setPrompt] = useState(prompts[0]);

        const nextPrompt = () => {
            const random = prompts[Math.floor(Math.random() * prompts.length)];
            setPrompt(random);
        };

        return (
            <div className="text-center p-4 bg-[#F8FAFC] rounded-2xl mb-4">
                <p className="text-text-emphasis font-medium mb-3">"{prompt}"</p>
                <button
                    onClick={nextPrompt}
                    className="text-xs bg-bg-dark border border-border-subtle px-3 py-1.5 rounded-full text-text-muted hover:border-[#FDA4AF] hover:text-pink-emphasis transition-colors cursor-pointer"
                >
                    New Prompt
                </button>
            </div>
        );
    };

    const renderActivity = () => {
        if (!selectedActivity) return null;

        const config = {
            'dance': { title: '5-Minute Dance Party', time: 5, icon: Music, color: '#FDA4AF' },
            'organize': { title: 'Organize ONE drawer', time: 15, icon: Archive, color: '#3B82F6' },
            'tetris': { title: 'Zen Bubble Grid', time: 10, icon: Puzzle, color: '#C4B5FD', game: true },
            'read': { title: 'Read 10 pages', time: 15, icon: Book, color: '#FDA4AF' },
            'tea': { title: 'Make your favorite tea', time: 10, icon: Coffee, color: '#3B82F6' },
            'text': { title: 'Text a friend', time: 5, icon: MessageCircle, color: '#C4B5FD', prompt: true }
        }[selectedActivity];

        if (!config) return null;

        const Icon = config.icon;

        return (
            <div className="flex flex-col h-full animate-in fade-in zoom-in duration-300">
                {/* Activity Header */}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => {
                            setSelectedActivity(null);
                            setTimerActive(false);
                        }}
                        className="p-2 -ml-2 rounded-full hover:bg-pink-bg-subtle text-text-emphasis border-none cursor-pointer transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-2">
                        <Icon size={20} className={`text-[${config.color}]`} />
                        <h2 className="text-text-emphasis font-bold text-base m-0">{config.title}</h2>
                    </div>
                </div>

                {/* Interactive Content */}
                <div className="flex-1 flex flex-col items-center justify-center">

                    {config.game ? (
                        <>
                            <ZenGrid />
                            <p className="text-xs text-text-muted">Click to pop bubbles!</p>
                        </>
                    ) : config.prompt ? (
                        <FriendPrompt />
                    ) : (
                        // Default Timer View
                        <div className="text-center">
                            <div className="text-6xl font-bold text-text-emphasis font-mono mb-6">
                                {timeLeft > 0 ? formatTime(timeLeft) : `${config.time}:00`}
                            </div>

                            {!timerActive ? (
                                <button
                                    onClick={() => startTimer(config.time)}
                                    className="bg-[#FDA4AF] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#F472B6] transition-colors shadow-lg shadow-pink-200 border-none cursor-pointer"
                                >
                                    Start Timer
                                </button>
                            ) : (
                                <button
                                    onClick={() => setTimerActive(false)}
                                    className="bg-bg-mid text-text-muted px-8 py-3 rounded-full font-bold text-sm hover:bg-[#E2E8F0] transition-colors border-none cursor-pointer"
                                >
                                    Pause
                                </button>
                            )}
                        </div>
                    )}

                </div>
            </div>
        );
    };

    // Spiral Logic
    const [spiralAction, setSpiralAction] = useState<string | null>(null);

    const BreathingExercise = () => {
        const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
        const [count, setCount] = useState(4);

        useEffect(() => {
            const timer = setInterval(() => {
                setCount((c) => {
                    if (c === 1) {
                        if (phase === 'Inhale') {
                            setPhase('Hold');
                            return 4;
                        } else if (phase === 'Hold') {
                            setPhase('Exhale');
                            return 4;
                        } else {
                            setPhase('Inhale');
                            return 4;
                        }
                    }
                    return c - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }, [phase]);

        return (
            <div className="flex flex-col items-center justify-center p-8">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-1000 mb-6 ${phase === 'Inhale' ? 'bg-info-bg scale-125' :
                    phase === 'Hold' ? 'bg-[#C4B5FD] scale-110' : 'bg-pink-bg-subtle scale-100'
                    }`}>
                    <span className="text-2xl font-bold text-text-emphasis">{count}</span>
                </div>
                <h3 className="text-xl font-bold text-text-emphasis mb-2">{phase}</h3>
                <p className="text-text-muted text-sm">Follow the rhythm to calm your nervous system.</p>
            </div>
        );
    };

    const GroundingExercise = () => {
        const steps = [
            "Name 5 things you can see",
            "Name 4 things you can feel",
            "Name 3 things you can hear",
            "Name 2 things you can smell",
            "Name 1 thing you can taste"
        ];
        const [step, setStep] = useState(0);

        return (
            <div className="p-6 text-center">
                <div className="w-full bg-bg-mid rounded-full h-2 mb-8">
                    <div
                        className="bg-[#FDA4AF] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((step + 1) / 5) * 100}%` }}
                    />
                </div>
                <h3 className="text-lg font-bold text-text-emphasis mb-4">{steps[step]}</h3>
                <div className="flex justify-center gap-2">
                    {step < 4 ? (
                        <button
                            onClick={() => setStep(s => s + 1)}
                            className="bg-info-bg text-info px-6 py-2 rounded-full font-bold hover:bg-[#BAE6FD] border-none cursor-pointer"
                        >
                            Next
                        </button>
                    ) : (
                        <div className="text-pink-emphasis font-bold animate-bounce">
                            You did it! You're grounded. 🌿
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const SpiralMenu = () => {
        if (spiralAction === 'breathing') {
            return (
                <div className="h-full flex flex-col">
                    <button onClick={() => setSpiralAction(null)} className="self-start p-2 hover:bg-bg-mid rounded-full mb-4 border-none cursor-pointer"><ArrowLeft size={20} /></button>
                    <BreathingExercise />
                </div>
            );
        }
        if (spiralAction === 'grounding') {
            return (
                <div className="h-full flex flex-col">
                    <button onClick={() => setSpiralAction(null)} className="self-start p-2 hover:bg-bg-mid rounded-full mb-4 border-none cursor-pointer"><ArrowLeft size={20} /></button>
                    <GroundingExercise />
                </div>
            );
        }
        if (spiralAction === 'reminders') {
            const reminders = [
                "You are enough, exactly as you are.",
                "This urge is just a feeling, not a command.",
                "Financial peace feels better than this purchase.",
                "You're doing great, sweetie.",
                "Taking care of your future self is an act of love."
            ];
            return (
                <div className="h-full flex flex-col">
                    <button onClick={() => setSpiralAction(null)} className="self-start p-2 hover:bg-bg-mid rounded-full mb-4 border-none cursor-pointer"><ArrowLeft size={20} /></button>
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                        <Smile size={48} className="text-pink-emphasis mb-6" />
                        <p className="text-lg text-text-emphasis font-medium leading-relaxed">
                            "{reminders[Math.floor(Math.random() * reminders.length)]}"
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-text-emphasis font-bold text-lg m-0">You're Safe Here</h2>
                    <button onClick={() => setView('home')} className="p-1 rounded-full hover:bg-bg-mid text-text-muted border-none cursor-pointer"><X size={20} /></button>
                </div>

                <div className="flex flex-col items-center mb-6">
                    <HeartHandshake className="text-info mb-2" size={40} />
                    <p className="text-center text-text-muted text-sm leading-relaxed m-0 px-2">
                        Hey bestie, I see you're having a moment. Let's take a breath together. Pick something that feels right:
                    </p>
                </div>

                <div className="space-y-3 flex-1">
                    <button onClick={() => setSpiralAction('breathing')} className="w-full bg-bg-mid p-4 rounded-2xl flex items-center gap-4 hover:bg-info-bg transition-colors border-none cursor-pointer text-left">
                        <div className="w-10 h-10 bg-bg-dark rounded-full flex items-center justify-center text-info">
                            <Wind size={20} />
                        </div>
                        <div>
                            <div className="text-text-emphasis font-bold text-sm">Breathing Exercise</div>
                            <div className="text-text-muted text-xs">4-4-4 calming breath</div>
                        </div>
                    </button>

                    <button onClick={() => setSpiralAction('grounding')} className="w-full bg-pink-bg-subtle p-4 rounded-2xl flex items-center gap-4 hover:bg-[#FFE4E6] transition-colors border-none cursor-pointer text-left">
                        <div className="w-10 h-10 bg-bg-dark rounded-full flex items-center justify-center text-pink-emphasis">
                            <Hand size={20} />
                        </div>
                        <div>
                            <div className="text-text-emphasis font-bold text-sm">5-4-3-2-1 Grounding</div>
                            <div className="text-text-muted text-xs">Connect with your senses</div>
                        </div>
                    </button>

                    <button onClick={() => setSpiralAction('reminders')} className="w-full bg-[#F3E8FF] p-4 rounded-2xl flex items-center gap-4 hover:bg-[#E9D5FF] transition-colors border-none cursor-pointer text-left">
                        <div className="w-10 h-10 bg-bg-dark rounded-full flex items-center justify-center text-[#C4B5FD]">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <div className="text-text-emphasis font-bold text-sm">Supportive Reminders</div>
                            <div className="text-text-muted text-xs">You're doing great!</div>
                        </div>
                    </button>
                </div>

                <div className="bg-gradient-to-r from-[#FFF0F5] to-[#E0F2FE] rounded-2xl p-4 mt-4">
                    <div className="flex items-center gap-2 mb-1">
                        <Lightbulb size={16} className="text-pink-emphasis fill-pink-emphasis" />
                        <span className="text-text-emphasis font-bold text-xs">Remember:</span>
                    </div>
                    <p className="text-text-muted text-xs leading-relaxed m-0">
                        This urge to spend is temporary. Your financial peace is forever. ✨
                    </p>
                </div>
            </div>
        );
    }

    if (view === 'spiral') {
        return (
            <div className="w-[350px] bg-bg-darkest p-6 font-sans min-h-[550px]">
                <SpiralMenu />
            </div>
        );
    }

    if (view === 'dopamine') {
        if (selectedActivity) {
            return (
                <div className="w-[350px] bg-bg-darkest p-6 font-sans min-h-[500px]">
                    {renderActivity()}
                </div>
            )
        }

        const activities = [
            { id: 'dance', icon: Music, color: '#FFF0F5', iconColor: '#FDA4AF', title: '5-Minute Dance Party', time: '5 min' },
            { id: 'organize', icon: Archive, color: '#E0F2FE', iconColor: '#3B82F6', title: 'Organize ONE drawer', time: '15 min' },
            { id: 'tetris', icon: Puzzle, color: '#F3E8FF', iconColor: '#C4B5FD', title: 'Play a Tetris game', time: '10 min' },
            { id: 'read', icon: Book, color: '#FFF0F5', iconColor: '#FDA4AF', title: 'Read 10 pages', time: '15 min' },
            { id: 'tea', icon: Coffee, color: '#E0F2FE', iconColor: '#3B82F6', title: 'Make your favorite tea', time: '10 min' },
            { id: 'text', icon: MessageCircle, color: '#F3E8FF', iconColor: '#C4B5FD', title: 'Text a friend', time: '5 min' }
        ];

        return (
            <div className="w-[350px] bg-bg-darkest p-6 font-sans min-h-[500px] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-text-emphasis font-bold text-lg m-0">Dopamine Menu</h2>
                    <button
                        onClick={() => setView('home')}
                        className="p-1 rounded-full hover:bg-bg-mid text-text-muted border-none cursor-pointer transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <p className="text-text-muted text-sm mb-6">
                    Try one of these instead! They're free and feel amazing ✨
                </p>

                {/* Scrollable List */}
                <div className="space-y-3 flex-1 overflow-y-auto pb-4">
                    {activities.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={idx}
                                onClick={() => setSelectedActivity(item.id)}
                                className="bg-bg-dark p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-border-subtle flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer"
                            >
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: item.color }}
                                >
                                    <Icon size={24} color={item.iconColor} />
                                </div>
                                <div>
                                    <div className="text-text-emphasis font-bold text-sm mb-1">{item.title}</div>
                                    <div className="flex items-center gap-1.5 text-text-muted text-xs">
                                        <Clock size={12} />
                                        <span>{item.time}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Pro Tip */}
                <div className="bg-gradient-to-r from-[#FFF0F5] to-[#E0F2FE] rounded-2xl p-4 mt-2">
                    <div className="flex items-center gap-2 mb-1">
                        <Lightbulb size={16} className="text-pink-emphasis fill-pink-emphasis" />
                        <span className="text-text-emphasis font-bold text-xs">Pro tip:</span>
                    </div>
                    <p className="text-text-muted text-xs leading-relaxed m-0">
                        Pick the activity that takes as long as you usually spend scrolling!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[350px] bg-bg-darkest p-6 font-sans">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <img src="/logo_full.jpg" alt="WalletGlow" className="h-8 object-contain" />
                <div className="bg-info-bg text-text-emphasis text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full"></div>
                    Active
                </div>
            </div>

            {/* Stats Card */}
            <div className="bg-pink-bg-subtle rounded-3xl p-6 mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-4 border-b border-pink-border pb-4">
                    <div className="flex items-center gap-3">
                        <Flame className="text-pink-emphasis" size={20} />
                        <span className="text-text-emphasis text-sm font-medium">Current Streak</span>
                    </div>
                    <span className="text-pink-emphasis text-xl font-bold">{streak}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-[#93C5FD] font-bold text-lg">$</span>
                        <span className="text-text-emphasis text-sm font-medium">Money Saved</span>
                    </div>
                    <span className="text-pink-emphasis text-xl font-bold">${savings.toFixed(2)}</span>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
                <h2 className="text-text-emphasis text-sm font-bold mb-3">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setView('spiral')}
                        className="flex flex-col items-center justify-center p-4 bg-bg-dark border border-border-subtle rounded-2xl hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-full bg-info-bg flex items-center justify-center mb-2 text-info font-bold text-xs">
                            @
                        </div>
                        <span className="text-text-emphasis text-xs font-medium">I'm spiraling</span>
                    </button>

                    <button
                        onClick={() => setView('dopamine')}
                        className="flex flex-col items-center justify-center p-4 bg-bg-dark border border-border-subtle rounded-2xl hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                    >
                        <Brain className="text-[#C4B5FD] mb-2" size={24} />
                        <span className="text-text-emphasis text-xs font-medium">Dopamine Menu</span>
                    </button>

                    <button
                        onClick={() => setView('wishlist')}
                        className="flex flex-col items-center justify-center p-4 bg-bg-dark border border-border-subtle rounded-2xl hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                    >
                        <Heart className="text-pink-emphasis mb-2" size={24} />
                        <span className="text-text-emphasis text-xs font-medium">Wishlist</span>
                        <span className="text-text-muted text-[10px]">{items.length} items</span>
                    </button>

                    <button className="flex flex-col items-center justify-center p-4 bg-bg-dark border border-border-subtle rounded-2xl hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                        <Settings className="text-text-muted mb-2" size={24} />
                        <span className="text-text-emphasis text-xs font-medium">Settings</span>
                    </button>
                </div>
            </div>

            {/* Full Dashboard Link */}
            <button
                onClick={handleOpenDashboard}
                className="w-full bg-[#F8FAFC] hover:bg-bg-mid text-pink-emphasis py-3 rounded-xl font-medium text-sm transition-colors cursor-pointer border-none"
            >
                Open Full Dashboard →
            </button>
        </div>
    );
}

export function Popup() {
    return (
        <ToastProvider>
            <PopupContent />
        </ToastProvider>
    );
}
