import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { DollarSign, TrendingUp, Heart, ShoppingBag, Coffee, Music, Smile, ArrowDownRight } from 'lucide-react';
import { Card } from './Card';

export function BudgetPage() {
    const data = [
        { name: 'Shopping', value: 145, color: '#FB7185' }, // Red/Pink
        { name: 'Dining Out', value: 180, color: '#60A5FA' }, // Blue
        { name: 'Beauty & Self Care', value: 89, color: '#F472B6' }, // Pink
        { name: 'Entertainment', value: 45, color: '#C084FC' }, // Purple
        { name: 'Fun Money', value: 67, color: '#FDA4AF' }, // Light Pink
    ];

    const categories = [
        { name: 'Shopping', spent: 145, limit: 200, color: 'bg-[#FB7185]', icon: ShoppingBag, iconBg: 'bg-red-100 text-red-500' },
        { name: 'Beauty & Self Care', spent: 89, limit: 150, color: 'bg-[#F472B6]', icon: Heart, iconBg: 'bg-pink-100 text-pink-500' },
        { name: 'Dining Out', spent: 180, limit: 250, color: 'bg-[#60A5FA]', icon: Coffee, iconBg: 'bg-blue-100 text-blue-500' },
        { name: 'Entertainment', spent: 45, limit: 100, color: 'bg-[#C084FC]', icon: Music, iconBg: 'bg-purple-100 text-purple-500' },
        { name: 'Fun Money', spent: 67, limit: 150, color: 'bg-[#FDA4AF]', icon: Smile, iconBg: 'bg-orange-100 text-orange-500' },
    ];

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-12">
            <div>
                <h1 className="text-text-emphasis mb-2 text-2xl font-bold">Monthly Budget</h1>
                <p className="text-text-muted flex items-center gap-2">
                    Track your spending and stay on target <span className="text-yellow-400">✨</span>
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-[#FFF0F5] p-6 rounded-3xl border-none shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="text-xs text-text-muted mb-1">Total Budget</div>
                        <div className="text-3xl font-bold text-text-emphasis mb-1">$850</div>
                        <div className="text-xs text-text-muted">this month</div>
                    </div>
                    <div className="absolute right-6 top-6 w-12 h-12 bg-pink-200/50 rounded-2xl flex items-center justify-center text-pink-500">
                        <DollarSign size={24} />
                    </div>
                </Card>

                <Card className="bg-white p-6 rounded-3xl border border-border-subtle shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="text-xs text-text-muted mb-1">Spent So Far</div>
                        <div className="text-3xl font-bold text-text-emphasis mb-1">$526</div>
                        <div className="text-xs text-text-muted">62% of budget</div>
                    </div>
                    <div className="absolute right-6 top-6 w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-400">
                        <TrendingUp size={24} />
                    </div>
                </Card>

                <Card className="bg-white p-6 rounded-3xl border border-border-subtle shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="text-xs text-text-muted mb-1">Remaining</div>
                        <div className="text-3xl font-bold text-text-emphasis mb-1">$324</div>
                        <div className="text-xs text-text-muted">to spend</div>
                    </div>
                    <div className="absolute right-6 top-6 w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-400">
                        <Heart size={24} />
                    </div>
                </Card>
            </div>

            {/* Charts & Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Spending Breakdown Chart */}
                <Card className="lg:col-span-2 bg-white p-8 rounded-3xl border border-border-subtle shadow-sm flex flex-col">
                    <h2 className="text-lg font-bold text-text-emphasis mb-6">Spending Breakdown</h2>
                    <div className="flex-1 flex items-center justify-center relative min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) => [`$${value}`, 'Spent']}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Legend */}
                        <div className="absolute bottom-0 w-full flex flex-wrap justify-center gap-x-6 gap-y-2">
                            {data.map((entry, index) => (
                                <div key={index} className="flex items-center gap-2 text-xs text-text-muted">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                    {entry.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Monthly Stats */}
                <Card className="bg-white p-6 rounded-3xl border border-border-subtle shadow-sm space-y-4">
                    <h2 className="text-lg font-bold text-text-emphasis mb-2">This Month's Stats</h2>

                    <div className="bg-[#FFF0F5] p-4 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/60 rounded-xl flex items-center justify-center text-pink-500">
                                <TrendingUp size={18} />
                            </div>
                            <div>
                                <div className="text-xs text-text-muted">Biggest Category</div>
                                <div className="text-sm font-bold text-text-emphasis">Dining Out</div>
                            </div>
                        </div>
                        <div className="text-pink-emphasis font-bold">$180</div>
                    </div>

                    <div className="bg-[#E0F2FE] p-4 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/60 rounded-xl flex items-center justify-center text-blue-500">
                                <ArrowDownRight size={18} />
                            </div>
                            <div>
                                <div className="text-xs text-text-muted">Most Improved</div>
                                <div className="text-sm font-bold text-text-emphasis">Shopping</div>
                            </div>
                        </div>
                        <div className="text-blue-500 font-bold">-23%</div>
                    </div>

                    <div className="bg-[#F3E8FF] p-4 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/60 rounded-xl flex items-center justify-center text-purple-500">
                                <Heart size={18} />
                            </div>
                            <div>
                                <div className="text-xs text-text-muted">Impulse Blocks</div>
                                <div className="text-sm font-bold text-text-emphasis">Purchases avoided</div>
                            </div>
                        </div>
                        <div className="text-purple-500 font-bold">12</div>
                    </div>

                    <div className="bg-gradient-to-r from-[#F0F9FF] to-[#E0F2FE] p-4 rounded-2xl mt-4">
                        <div className="text-xs text-text-muted mb-1">Money saved from impulse blocks</div>
                        <div className="text-2xl font-bold text-pink-emphasis">$450.00</div>
                    </div>
                </Card>
            </div>

            {/* Category Budgets */}
            <Card className="bg-white p-8 rounded-3xl border border-border-subtle shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-bold text-text-emphasis">Category Budgets</h2>
                    <button className="text-xs text-text-muted hover:text-pink-emphasis bg-transparent border-none cursor-pointer">
                        Click to edit amounts
                    </button>
                </div>

                <div className="space-y-8">
                    {categories.map((cat, idx) => (
                        <div key={idx}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.iconBg}`}>
                                        <cat.icon size={14} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-text-emphasis">{cat.name}</div>
                                        <div className="text-xs text-text-muted">${cat.spent} of ${cat.limit}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-text-emphasis">${cat.limit - cat.spent}</div>
                                </div>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full ${cat.color}`}
                                    style={{ width: `${(cat.spent / cat.limit) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Footer Banner */}
            <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-3xl p-6 flex items-center gap-4">
                <div className="text-pink-400 text-2xl">✨</div>
                <div>
                    <div className="text-sm font-bold text-text-emphasis mb-1">You're doing great!</div>
                    <div className="text-xs text-text-muted">
                        You've got $324 left this month. That's awesome self-control! 💖
                    </div>
                </div>
            </div>
        </div>
    );
}
