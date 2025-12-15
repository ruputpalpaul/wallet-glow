import { useState } from 'react';
import { User, Mail, Sparkles, Shield, Bell, Award, Lock } from 'lucide-react';
import { Card } from './Card';

export function SettingsPage() {
    const [coolingPeriod, setCoolingPeriod] = useState('48h');
    const [toggles, setToggles] = useState({
        autoBlock: true,
        cashMode: true,
        strictMode: false,
        emailNotif: true,
        browserNotif: true,
        purchaseReminders: true,
        showAchievements: true,
        achievementSounds: true
    });

    const handleToggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const Toggle = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
        <button
            onClick={onClick}
            className={`w-12 h-6 rounded-full relative transition-colors duration-300 border-none cursor-pointer ${active ? 'bg-pink-emphasis' : 'bg-gray-300'
                }`}
        >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${active ? 'left-7' : 'left-1'
                }`} />
        </button>
    );

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-12">
            <div>
                <h1 className="text-text-emphasis mb-2 text-2xl font-bold">Settings</h1>
                <p className="text-text-muted">Customize your WalletGlow experience</p>
            </div>

            {/* Profile Section */}
            <Card className="bg-bg-dark border border-border-subtle p-8 rounded-3xl">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2">
                        <User className="text-pink-emphasis" size={20} />
                        <h2 className="text-lg font-bold text-text-emphasis m-0">Profile</h2>
                    </div>
                    <button className="text-pink-emphasis text-sm font-medium hover:underline bg-transparent border-none cursor-pointer">
                        Edit
                    </button>
                </div>

                <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-full bg-[#FDA4AF] flex items-center justify-center text-3xl text-white font-bold">
                        S
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-text-emphasis m-0">Sarah</h3>
                            <Sparkles className="text-yellow-400 fill-yellow-400" size={16} />
                        </div>
                        <p className="text-text-muted text-sm m-0">Your friendly display name</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-text-muted mb-1.5 flex items-center gap-2">
                            <Mail size={12} /> Email Address
                        </label>
                        <div className="w-full bg-pink-bg-subtle p-3 rounded-xl text-text-emphasis text-sm border-none">
                            sarah@example.com
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-text-muted mb-1.5 flex items-center gap-2">
                            <Sparkles size={12} /> About You
                        </label>
                        <div className="w-full bg-pink-bg-subtle p-3 rounded-xl text-text-emphasis text-sm border-none">
                            Just trying to make better choices 💖
                        </div>
                    </div>
                </div>
            </Card>

            {/* Shopping Protection */}
            <Card className="bg-bg-dark border border-border-subtle p-8 rounded-3xl">
                <div className="flex items-center gap-2 mb-6">
                    <Shield className="text-info" size={20} />
                    <h2 className="text-lg font-bold text-text-emphasis m-0">Shopping Protection</h2>
                </div>

                <div className="mb-8">
                    <label className="text-sm font-medium text-text-emphasis mb-2 block">
                        Default Cooling-Off Period
                    </label>
                    <p className="text-xs text-text-muted mb-4">How long before you can complete a purchase</p>
                    <div className="grid grid-cols-3 gap-3">
                        {['24h', '48h', '72h'].map((time) => (
                            <button
                                key={time}
                                onClick={() => setCoolingPeriod(time)}
                                className={`py-3 rounded-xl text-sm font-bold border-none cursor-pointer transition-all ${coolingPeriod === time
                                    ? 'bg-pink-emphasis text-white shadow-md shadow-pink-200'
                                    : 'bg-pink-bg-subtle text-text-muted hover:bg-pink-bg-muted'
                                    }`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium text-text-emphasis mb-1">Auto-Block Checkout Pages</div>
                            <div className="text-xs text-text-muted">Automatically intercept checkout URLs</div>
                        </div>
                        <Toggle active={toggles.autoBlock} onClick={() => handleToggle('autoBlock')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium text-text-emphasis mb-1">Cash-First Mode</div>
                            <div className="text-xs text-text-muted">Block credit cards, allow debit/cash only</div>
                        </div>
                        <Toggle active={toggles.cashMode} onClick={() => handleToggle('cashMode')} />
                    </div>
                    <div className="flex items-center justify-between opacity-50">
                        <div>
                            <div className="font-medium text-text-emphasis mb-1">Strict Mode</div>
                            <div className="text-xs text-text-muted">No skipping questions, extended cooling-off periods</div>
                        </div>
                        <Toggle active={toggles.strictMode} onClick={() => handleToggle('strictMode')} />
                    </div>
                </div>
            </Card>

            {/* Notifications */}
            <Card className="bg-bg-dark border border-border-subtle p-8 rounded-3xl">
                <div className="flex items-center gap-2 mb-6">
                    <Bell className="text-[#C4B5FD]" size={20} />
                    <h2 className="text-lg font-bold text-text-emphasis m-0">Notifications</h2>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium text-text-emphasis mb-1">Email Notifications</div>
                            <div className="text-xs text-text-muted">Get weekly summaries and achievement updates</div>
                        </div>
                        <Toggle active={toggles.emailNotif} onClick={() => handleToggle('emailNotif')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium text-text-emphasis mb-1">Browser Notifications</div>
                            <div className="text-xs text-text-muted">Get real-time alerts in your browser</div>
                        </div>
                        <Toggle active={toggles.browserNotif} onClick={() => handleToggle('browserNotif')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium text-text-emphasis mb-1">Purchase Reminders</div>
                            <div className="text-xs text-text-muted">Remind me when cooling-off periods end</div>
                        </div>
                        <Toggle active={toggles.purchaseReminders} onClick={() => handleToggle('purchaseReminders')} />
                    </div>
                </div>
            </Card>

            {/* Gamification */}
            <Card className="bg-bg-dark border border-border-subtle p-8 rounded-3xl">
                <div className="flex items-center gap-2 mb-6">
                    <Award className="text-pink-emphasis" size={20} />
                    <h2 className="text-lg font-bold text-text-emphasis m-0">Gamification & Rewards</h2>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium text-text-emphasis mb-1">Show Achievements</div>
                            <div className="text-xs text-text-muted">Display collectibles and unlock notifications</div>
                        </div>
                        <Toggle active={toggles.showAchievements} onClick={() => handleToggle('showAchievements')} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium text-text-emphasis mb-1">Achievement Sounds</div>
                            <div className="text-xs text-text-muted">Play sound effects when unlocking rewards</div>
                        </div>
                        <Toggle active={toggles.achievementSounds} onClick={() => handleToggle('achievementSounds')} />
                    </div>
                </div>
            </Card>

            {/* Budget & Currency */}
            <Card className="bg-bg-dark border border-border-subtle p-8 rounded-3xl">
                <div className="flex items-center gap-2 mb-6">
                    <div className="text-blue-400"><CreditCardIcon size={20} /></div>
                    <h2 className="text-lg font-bold text-text-emphasis m-0">Budget & Currency</h2>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-xs font-medium text-text-muted mb-2 flex items-center gap-2">
                            <GlobeIcon size={14} /> Currency
                        </label>
                        <div className="w-full bg-white border border-border-subtle p-3 rounded-xl text-text-emphasis text-sm flex items-center justify-between">
                            <span>USD ($)</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-text-muted mb-2 flex items-center gap-2">
                            <WalletIcon size={14} /> Monthly Income (optional)
                        </label>
                        <div className="w-full bg-white border border-border-subtle p-3 rounded-xl text-text-emphasis text-sm flex items-center gap-2">
                            <span className="text-text-muted">$</span>
                            <span>3500</span>
                        </div>
                        <div className="text-[10px] text-text-muted mt-1.5 ">Helps us suggest realistic budgets</div>
                    </div>
                </div>
            </Card>

            {/* Security & Privacy */}
            <Card className="bg-bg-dark border border-border-subtle p-8 rounded-3xl">
                <div className="flex items-center gap-2 mb-6">
                    <Lock className="text-pink-emphasis" size={20} />
                    <h2 className="text-lg font-bold text-text-emphasis m-0">Security & Privacy</h2>
                </div>

                <div className="space-y-3">
                    <button className="w-full bg-pink-bg-subtle hover:bg-pink-100 transition-colors border-none p-4 rounded-xl flex items-center justify-between cursor-pointer group">
                        <span className="text-text-emphasis text-sm font-medium">Change Password</span>
                        <Lock size={16} className="text-text-muted group-hover:text-pink-emphasis" />
                    </button>
                    <button className="w-full bg-pink-bg-subtle hover:bg-pink-100 transition-colors border-none p-4 rounded-xl flex items-center justify-between cursor-pointer group">
                        <span className="text-text-emphasis text-sm font-medium">Export My Data</span>
                        <DownloadIcon size={16} className="text-text-muted group-hover:text-pink-emphasis" />
                    </button>
                    <button className="w-full bg-danger-bg hover:bg-red-100 transition-colors border-none p-4 rounded-xl flex items-center justify-between cursor-pointer group">
                        <span className="text-danger text-sm font-medium">Delete Account</span>
                        <TrashIcon size={16} className="text-danger" />
                    </button>
                </div>
            </Card>

            {/* Logout */}
            <button className="w-full bg-pink-emphasis hover:opacity-90 transition-opacity text-white font-bold py-4 rounded-2xl shadow-lg shadow-pink-200 border-none cursor-pointer flex items-center justify-center gap-2">
                <LogOutIcon size={18} /> Log Out
            </button>

            {/* Footer */}
            <div className="text-center space-y-1 mt-8 pb-4">
                <div className="text-xs text-text-muted">WalletGlow v1.0.0</div>
                <div className="text-xs text-text-muted">Made with 💖 for mindful spending</div>
            </div>
        </div>
    );
}

// Icon helpers
function CreditCardIcon(props: any) { return <span {...props}>💳</span>; } // Placeholder
function GlobeIcon(props: any) { return <span {...props}>🌐</span>; } // Placeholder
function WalletIcon(props: any) { return <span {...props}>💳</span>; } // Placeholder
function DownloadIcon(props: any) { return <span {...props}>⬇️</span>; } // Placeholder
function TrashIcon(props: any) { return <span {...props}>🗑️</span>; } // Placeholder
function LogOutIcon(props: any) { return <span {...props}>↪️</span>; } // Placeholder
