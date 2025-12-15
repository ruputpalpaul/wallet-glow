
import { Check, Heart, Sparkles, Star, Infinity } from 'lucide-react';

const PlanFeature = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start gap-3 text-sm text-slate-600">
        <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
            <Check size={12} strokeWidth={3} />
        </div>
        <span>{children}</span>
    </li>
);

const LifetimeFeature = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
        <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
            <Check size={12} strokeWidth={3} />
        </div>
        <span>{children}</span>
    </li>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-900 mb-2">{question}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{answer}</p>
    </div>
);

export function PricingPage() {

    const handleCheckout = async (plan: 'monthly' | 'lifetime') => {
        // Stripe Payment Links
        // NOTE: Enable "Free Trial" (7 days) for the Monthly link in Stripe Dashboard if not already set.
        const MONTHLY_LINK = 'https://buy.stripe.com/test_dRm8wIcZT5al34M8hhe3e00';
        const LIFETIME_LINK = 'https://buy.stripe.com/test_7sYeV65xrcCN6gY7dde3e01';

        // Check for Auth
        const { data: { user } } = await import('../lib/supabase').then(m => m.supabase.auth.getUser());

        if (!user) {
            // Redirect to signup if not logged in
            window.location.href = '#signup?next=pricing';
            return;
        }

        // Attach user ID to the Stripe URL as client_reference_id
        const baseUrl = plan === 'monthly' ? MONTHLY_LINK : LIFETIME_LINK;
        // Check if URL already has query params
        const separator = baseUrl.includes('?') ? '&' : '?';
        const finalUrl = `${baseUrl}${separator}client_reference_id=${user.id}`;

        window.location.href = finalUrl;
    };

    return (
        <div className="pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
                        <Sparkles size={12} className="text-rose-500 fill-rose-500" />
                        Try free for 7 days, no credit card needed
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight">
                        Choose Your <span className="text-rose-400">WalletGlow Plan</span>
                    </h1>
                    <p className="text-lg text-slate-500 mb-8">
                        Start your journey to mindful spending with a 7-day free trial. No pressure, just support. 💖
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center gap-2"><Check size={14} className="text-rose-400" /> 7-Day Free Trial</span>
                        <span className="flex items-center gap-2"><Heart size={14} className="text-rose-400" /> Cancel Anytime</span>
                        <span className="flex items-center gap-2"><Sparkles size={14} className="text-rose-400" /> Instant Access</span>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24 items-start">

                    {/* Monthly Plan */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 relative hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-500">
                                <Star size={20} className="fill-current" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Monthly</h3>
                        </div>
                        <div className="mb-2">
                            <span className="text-4xl font-bold text-slate-900">$4.99</span>
                            <span className="text-slate-400 text-sm"> / month</span>
                        </div>
                        <p className="text-xs text-slate-400 mb-8">Billed monthly after 7-day free trial</p>

                        <button
                            onClick={() => handleCheckout('monthly')}
                            className="w-full py-4 rounded-xl bg-rose-400 text-white font-bold shadow-lg shadow-rose-200 hover:bg-rose-500 hover:shadow-xl hover:shadow-rose-300/50 hover:scale-[1.02] transition-all duration-300 mb-8"
                        >
                            Start 7-Day Free Trial
                        </button>

                        <ul className="space-y-4 mb-4">
                            <PlanFeature>Full access to Chrome extension</PlanFeature>
                            <PlanFeature>Mobile app for iOS & Android</PlanFeature>
                            <PlanFeature>Unlimited reality checks</PlanFeature>
                            <PlanFeature>Budget tracking & insights</PlanFeature>
                            <PlanFeature>Trigger mapping</PlanFeature>
                            <PlanFeature>Achievement system</PlanFeature>
                            <PlanFeature>Emergency fund tracking</PlanFeature>
                            <PlanFeature>Dopamine menu alternatives</PlanFeature>
                            <PlanFeature>Cancel anytime</PlanFeature>
                        </ul>
                    </div>

                    {/* Lifetime Plan */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border-2 border-indigo-100 shadow-2xl shadow-indigo-100/50 relative hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                        {/* Best Value Badge */}
                        <div className="absolute top-0 right-0 bg-indigo-200 text-indigo-700 text-xs font-bold px-4 py-1.5 rounded-bl-2xl">
                            Best Value
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
                                <Infinity size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Lifetime</h3>
                        </div>
                        <div className="mb-2">
                            <span className="text-4xl font-bold text-slate-900">$50</span>
                            <span className="text-slate-400 text-sm"> one-time</span>
                        </div>
                        <div className="text-xs text-indigo-500 font-bold bg-indigo-50 inline-block px-2 py-1 rounded-lg mb-8">
                            Save over $10/year forever
                        </div>

                        <button
                            onClick={() => handleCheckout('lifetime')}
                            className="w-full py-4 rounded-xl bg-indigo-400 text-white font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-300/50 hover:scale-[1.02] transition-all duration-300 mb-8"
                        >
                            Get Lifetime Access
                        </button>

                        <ul className="space-y-4 mb-4">
                            <PlanFeature><strong>Everything in Monthly, plus:</strong></PlanFeature>
                            <LifetimeFeature>One-time payment, yours forever</LifetimeFeature>
                            <LifetimeFeature>All future updates included</LifetimeFeature>
                            <LifetimeFeature>Priority customer support</LifetimeFeature>
                            <LifetimeFeature>Early access to new features</LifetimeFeature>
                            <LifetimeFeature>Exclusive lifetime badges</LifetimeFeature>
                            <LifetimeFeature>Support indie development</LifetimeFeature>
                            <LifetimeFeature>Best value - saves $10/year</LifetimeFeature>
                        </ul>
                    </div>
                </div>

                {/* Comparison Chart */}
                <div className="bg-rose-50/50 rounded-[3rem] p-10 md:p-16 max-w-4xl mx-auto mb-24 text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-12">Lifetime vs Monthly</h3>
                    <div className="grid grid-cols-3 gap-8 md:gap-16">
                        <div>
                            <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Year 1</div>
                            <div className="text-2xl font-bold text-slate-900 mb-1">$50 vs $60</div>
                            <div className="text-xs text-indigo-500 font-bold">Save $10</div>
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Year 2</div>
                            <div className="text-2xl font-bold text-slate-900 mb-1">$50 vs $120</div>
                            <div className="text-xs text-indigo-500 font-bold">Save $70</div>
                        </div>
                        <div>
                            <div className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Year 3</div>
                            <div className="text-2xl font-bold text-slate-900 mb-1">$50 vs $180</div>
                            <div className="text-xs text-indigo-500 font-bold">Save $130</div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className="max-w-3xl mx-auto mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
                            Questions? We got you <Heart size={24} className="text-rose-400 fill-rose-400" />
                        </h2>
                    </div>

                    <div className="grid gap-6">
                        <FAQItem
                            question="What happens after the 7-day free trial?"
                            answer="After 7 days, you'll be charged based on the plan you chose (Monthly or Lifetime). We'll send you a reminder email 2 days before your trial ends. If you cancel before then, you won't be charged at all."
                        />
                        <FAQItem
                            question="Can I switch from monthly to lifetime later?"
                            answer="Absolutely! You can upgrade to lifetime access anytime from your account settings. We'll credit any recent monthly payments toward your lifetime purchase."
                        />
                        <FAQItem
                            question="Is the lifetime plan really lifetime?"
                            answer="Yes! One payment, yours forever. You'll get all future updates, new features, and improvements at no extra cost. We're committed to supporting WalletGlow for the long haul."
                        />
                        <FAQItem
                            question="What if I need to cancel?"
                            answer="No judgment, no hassle. Monthly subscribers can cancel anytime from account settings. Lifetime users keep access forever, but if you need a refund within 30 days of purchase, just email us—we'll work it out."
                        />
                        <FAQItem
                            question="Do you offer student discounts?"
                            answer="Yes! Students get 40% off any plan. Email us at support@walletglow.com with your .edu email to get your discount code. We believe everyone deserves support, regardless of budget. 💖"
                        />
                        <FAQItem
                            question="I can't afford it right now. Are there other options?"
                            answer="We get it—financial stress is real. Reach out to support@walletglow.com and we'll work something out. We offer sliding scale pricing, payment plans, and hardship waivers because we believe everyone deserves access to tools that support their wellbeing."
                        />
                    </div>
                </div>

                {/* 30-Day Promise */}
                <div className="bg-slate-50 rounded-[3rem] p-12 text-center max-w-2xl mx-auto border border-slate-100">
                    <div className="w-16 h-16 bg-rose-200 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-600 shadow-lg shadow-rose-100">
                        <Heart size={32} className="fill-current" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">30-Day Money-Back Promise</h3>
                    <p className="text-slate-600 leading-relaxed mb-8">
                        Try WalletGlow risk-free. If it's not helping you shop more mindfully within 30 days, we'll refund you—no questions asked, no hard feelings. We're here to support you, not add stress. 💖
                    </p>
                    <button onClick={() => { window.location.hash = ''; window.scrollTo(0, 0); }} className="text-rose-500 hover:text-rose-600 font-bold hover:underline text-sm">
                        ← Back to Home
                    </button>
                </div>

            </div>
        </div>
    );
}

