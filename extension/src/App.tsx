import { useState, useEffect } from 'react';
import { Home, TrendingUp, Heart, GraduationCap, Settings, Sparkles, CreditCard, DollarSign, Clock, Gem } from 'lucide-react';
import { Card } from './components/Card';
import { JewelryBox } from './components/JewelryBox';
import { Popup } from './components/Popup';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { WishlistPage } from './components/WishlistPage';
import { SettingsPage } from './components/SettingsPage';
import { LearnPage } from './components/LearnPage';
import { BudgetPage } from './components/BudgetPage';

const budgetData = [
  { name: 'Safe to Spend', value: 450, color: '#93C5FD' },
  { name: 'Bills & Fixed', value: 800, color: 'var(--color-pink-emphasis)' },
  { name: 'Savings Goal', value: 250, color: '#C4B5FD' }
];

const triggerData = [
  { day: 'Mon', attempts: 2 },
  { day: 'Tue', attempts: 7 },
  { day: 'Wed', attempts: 3 },
  { day: 'Thu', attempts: 4 },
  { day: 'Fri', attempts: 5 },
  { day: 'Sat', attempts: 3 },
  { day: 'Sun', attempts: 1 }
];

const wishlistItems = [
  { id: 1, name: 'Aesthetic desk lamp', price: 45, hoursLeft: 36 },
  { id: 2, name: 'Yoga mat set', price: 67, hoursLeft: 12 },
  { id: 3, name: 'Minimalist planner', price: 28, hoursLeft: 48 }
];

function App() {

  const [activeNav, setActiveNav] = useState('home');
  const [cashOnlyMode, setCashOnlyMode] = useState(true);

  const [isMounted, setIsMounted] = useState(false);

  // Simple hash-based routing
  const [isDashboard, setIsDashboard] = useState(window.location.hash.includes('dashboard'));

  useEffect(() => {
    setIsMounted(true);

    // Listen for hash changes
    const handleHashChange = () => {
      setIsDashboard(window.location.hash.includes('dashboard'));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'budget', icon: TrendingUp, label: 'Budget' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
    { id: 'jewelry', icon: Gem, label: 'Jewelry Box' },
    { id: 'education', icon: GraduationCap, label: 'Learn' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  // If not in dashboard mode, show the Popup component
  if (!isDashboard) {
    return <Popup />;
  }



  // Dashboard Render
  return (
    <div className="min-h-screen bg-bg-darkest flex w-screen h-screen overflow-hidden text-text-default">
      {/* Sidebar */}
      <div className="w-64 bg-bg-dark border-r border-border-subtle p-6 space-y-8 flex-shrink-0 shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Sparkles className="text-pink-emphasis" size={28} />
          <h2 className="text-text-emphasis font-bold text-xl">WalletGlow</h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 border-none cursor-pointer ${isActive
                  ? 'bg-pink-bg-subtle text-pink-emphasis font-semibold'
                  : 'text-text-muted hover:bg-bg-mid hover:text-text-emphasis bg-transparent'
                  }`}
              >
                <Icon size={20} />
                <span className={isActive ? "font-semibold" : "font-medium"}>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>


      <div className="flex-1 p-8 overflow-y-auto">
        {activeNav === 'wishlist' && <WishlistPage />}
        {activeNav === 'settings' && <SettingsPage />}
        {activeNav === 'education' && <LearnPage />}
        {activeNav === 'jewelry' && <JewelryBox onClose={() => setActiveNav('home')} />}
        {activeNav === 'budget' && <BudgetPage />}

        {activeNav === 'home' && (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-text-emphasis mb-2 text-2xl font-bold">Welcome back, bestie! ✨</h1>
              <p className="text-text-muted">Here&apos;s how you&apos;re doing today</p>
            </div>
            {/* ... Bento Grid ... */}
            {/* Bento Grid Layout - 2 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* ... rest of dashboard ... */}

              {/* Left Column (Main Content) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Visual Budget - Donut Chart */}
                <Card className="bg-bg-dark border border-border-subtle shadow-sm">
                  <h3 className="text-text-emphasis mb-4 font-bold">Your Budget at a Glance</h3>
                  <div className="flex items-center gap-8">
                    <div className="w-[160px] h-[160px] flex-shrink-0" style={{ minWidth: '160px', minHeight: '160px' }}>
                      {isMounted && (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={budgetData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={70}
                              paddingAngle={5}
                              dataKey="value"
                              stroke="none"
                            >
                              {/* Note: Recharts colors fallback or need explicit token mapping. Keeping simple for now */}
                              {budgetData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      {budgetData.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm text-text-default font-medium">{item.name}</span>
                          </div>
                          <span className="text-text-emphasis font-bold">${item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Wishlist Preview */}
                <Card className="bg-bg-dark border border-border-subtle shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-text-emphasis font-bold">Cooling Off Wishlist</h3>
                    <span className="text-xs text-text-muted">{wishlistItems.length} items</span>
                  </div>
                  <div className="space-y-3">
                    {wishlistItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-pink-bg-subtle rounded-2xl border border-pink-bg-muted"
                      >
                        <div>
                          <div className="text-text-emphasis font-medium">{item.name}</div>
                          <div className="text-xs text-text-muted flex items-center gap-2 mt-1">
                            <Clock size={12} />
                            <span>{item.hoursLeft}h left</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-pink-emphasis font-bold">${item.price}</div>
                          <div className="text-[10px] text-text-muted">
                            {item.hoursLeft < 24 ? 'Almost there!' : 'Still thinking...'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Column (Stats & Controls) */}
              <div className="space-y-6">
                {/* Oh Sh*t Fund */}
                <Card className="bg-bg-dark border border-border-subtle shadow-sm">
                  <h3 className="text-text-emphasis mb-4 font-bold text-sm">The &quot;Oh Sh*t&quot; Fund</h3>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-24 h-24">
                      <svg className="transform -rotate-90 w-24 h-24">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="var(--color-pink-bg-muted)"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="var(--color-pink-emphasis)"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 40 * 0.68} ${2 * Math.PI * 40}`}
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-pink-emphasis">68%</span>
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-lg font-bold text-text-emphasis">$3,400</div>
                      <div className="text-[10px] text-text-muted mt-1">of $5,000 goal</div>
                    </div>
                  </div>
                </Card>

                {/* Cash-First Mode */}
                <Card className="bg-bg-dark border border-border-subtle shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-text-emphasis mb-2 font-bold text-sm">Cash-First Mode</h3>
                      <p className="text-[10px] text-text-muted">Credit cards blocked.</p>
                    </div>
                    <button
                      onClick={() => setCashOnlyMode(!cashOnlyMode)}
                      className={`relative w-12 h-7 rounded-full transition-all duration-300 border-none cursor-pointer ${cashOnlyMode ? 'bg-pink-emphasis' : 'bg-border-border-subtleault'
                        }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-5 h-5 bg-bg-dark rounded-full shadow-md transition-transform duration-300 ${cashOnlyMode ? 'transform translate-x-5' : ''
                          }`}
                      />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-text-default">
                      <CreditCard size={14} className="text-pink-emphasis" />
                      <span>Protection: {cashOnlyMode ? 'ON' : 'OFF'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-default">
                      <DollarSign size={14} className="text-info" />
                      <span>Debit allowed</span>
                    </div>
                  </div>
                </Card>

                {/* Trigger Map (Restored Responsiveness) */}
                <Card className="bg-bg-dark border border-border-subtle shadow-sm">
                  <h3 className="text-text-emphasis mb-4 font-bold">Shopping Trigger Map</h3>
                  <p className="text-xs text-text-muted mb-4">
                    When do you try to shop most?
                  </p>
                  <div className="h-48 w-full min-h-[192px]">
                    {isMounted && (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={triggerData}>
                          <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'var(--color-bg-dark)',
                              border: '1px solid var(--color-border-subtle)',
                              borderRadius: '12px',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                              color: 'var(--color-text-emphasis)'
                            }}
                          />
                          <Bar
                            dataKey="attempts"
                            fill="var(--color-pink-emphasis)"
                            radius={[8, 8, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                  <p className="text-xs text-pink-emphasis mt-2 font-medium">
                    ✨ Peak time: Tue @ 10 PM
                  </p>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
