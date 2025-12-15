import { Shield, FileText, CheckCircle, Lock, Eye, Server, Cookie, HelpCircle } from 'lucide-react';

function LegalLayout({ title, lastUpdated, children, icon: Icon }: { title: string, lastUpdated: string, children: React.ReactNode, icon: any }) {
    return (
        <div className="bg-[#fffdf7] min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-[#fff0f5] text-rose-500 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-rose-100">
                        <Icon size={14} className="fill-current" />
                        {title}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-display">
                        {title}
                    </h1>
                    <p className="text-slate-400 font-medium">Last updated: {lastUpdated}</p>
                </div>

                {/* Content Card */}
                {children}

                {/* Footer Help */}
                <div className="mt-16 sm:mt-24 text-center bg-[#fff0f5] rounded-3xl p-8 border border-rose-100/50">
                    <div className="flex justify-center mb-4 text-rose-400">
                        <HelpCircle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-rose-950 mb-2">Need help?</h3>
                    <p className="text-slate-600 mb-6">
                        If you have any questions or concerns, we're always here to listen.
                    </p>
                    <a href="mailto:privacy@walletglow.com" className="text-rose-500 hover:text-rose-600 font-semibold hover:underline">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}

function Section({ title, number, children, icon: Icon }: { title: string, number: string, children: React.ReactNode, icon?: any }) {
    return (
        <section className="bg-white rounded-[2rem] p-8 md:p-10 mb-6 border border-slate-100 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
                {Icon && (
                    <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 shrink-0">
                        <Icon size={20} />
                    </div>
                )}
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-3">
                        <span className="text-rose-300 font-mono text-lg">{number}.</span> {title}
                    </h2>
                </div>
            </div>
            <div className="text-slate-600 leading-relaxed space-y-4 pl-0 md:pl-14">
                {children}
            </div>
        </section>
    );
}

export function PrivacyPage() {
    return (
        <LegalLayout title="Privacy Policy" lastUpdated="December 15, 2024" icon={Lock}>
            <div className="space-y-6">
                {/* Introduction / Promise */}
                <div className="grid md:grid-cols-3 gap-4 mb-12">
                    {[
                        { icon: Shield, title: "We never sell your data" },
                        { icon: Eye, title: "No third-party tracking" },
                        { icon: Server, title: "Minimal data collection" }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 text-center shadow-sm">
                            <div className="mx-auto w-10 h-10 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-3">
                                <item.icon size={18} />
                            </div>
                            <p className="font-semibold text-slate-700 text-sm">{item.title}</p>
                        </div>
                    ))}
                </div>

                <Section number="1" title="Information We Collect" icon={FileText}>
                    <p>WalletGlow is designed to work locally on your device whenever possible. We minimize data collection to provide our service.</p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>Account Information:</strong> Email address and encrypted password for account creation.</li>
                        <li><strong>Usage Data:</strong> Metrics about feature usage to improve the app (no personal identifying information).</li>
                        <li><strong>Shopping Patterns:</strong> Trigger data and saving insights are stored locally on your device by default.</li>
                        <li><strong>Achievement Progress:</strong> Gamification data to track your milestones.</li>
                    </ul>
                </Section>

                <Section number="2" title="How We Use Your Information" icon={Server}>
                    <p>Your information is used exclusively to provide and improve WalletGlow:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>Deliver the cooling-off period and reality check features.</li>
                        <li>Sync your data across devices (if you enable this feature).</li>
                        <li>Provide personalized insights about your spending patterns.</li>
                        <li>Send important service updates (you can opt out of non-essential emails).</li>
                    </ul>
                </Section>

                <Section number="3" title="Information Sharing" icon={Shield}>
                    <p><strong>We do not sell, rent, or trade your personal information. Ever.</strong></p>
                    <p>We only share information in these limited circumstances:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>With Your Consent:</strong> We'll ask before sharing your information for any reason not covered here.</li>
                        <li><strong>Service Providers:</strong> Helpers operating (e.g., cloud hosting), bound by strict confidentiality agreements.</li>
                        <li><strong>Legal Requirements:</strong> Only if required by law or to protect rights and safety.</li>
                    </ul>
                </Section>

                <Section number="4" title="Data Security" icon={Lock}>
                    <p>We take security seriously. We use bank-grade encryption to protect your data both in transit and at rest.</p>
                    <p>Local-first architecture means most data stays on your device.</p>
                </Section>

                <Section number="5" title="Cookies & Tracking" icon={Cookie}>
                    <p>We use minimal, essential cookies for functionality (like keeping you logged in). We do NOT use third-party advertising cookies or tracking pixels.</p>
                </Section>
            </div>
        </LegalLayout>
    );
}

export function TermsPage() {
    return (
        <LegalLayout title="Terms of Service" lastUpdated="December 15, 2024" icon={FileText}>
            <div className="bg-[#fff0f5] p-6 rounded-2xl border border-rose-100 mb-8 flex gap-4 items-start">
                <div className="shrink-0 text-rose-500 mt-1">
                    <CheckCircle size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-rose-900 mb-1">Friendly Note</h3>
                    <p className="text-sm text-slate-600">
                        We know legalese is boring, but these rules help ensure WalletGlow remains a safe, positive space for everyone.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <Section number="1" title="Acceptance of Terms" icon={CheckCircle}>
                    <p>
                        By accessing or using WalletGlow, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not use our service.
                    </p>
                </Section>

                <Section number="2" title="Description of Service" icon={FileText}>
                    <p>WalletGlow provides:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>Browser extension for impulse control.</li>
                        <li>Web dashboard for settings and analytics.</li>
                        <li>Gamification features for saving milestones.</li>
                    </ul>
                </Section>

                <Section number="3" title="User Responsibilities" icon={Shield}>
                    <p>You agree to use the service responsibly:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>Profile Information:</strong> You are responsible for maintaining the confidentiality of your account.</li>
                        <li><strong>Lawful Use:</strong> You agree not to use the service for any illegal or unauthorized purpose.</li>
                        <li><strong>Respect Others:</strong> Do not harass, abuse, or harm other users.</li>
                    </ul>
                </Section>

                <Section number="4" title="Payment & Subscriptions" icon={Lock}>
                    <p>
                        Some features of WalletGlow are paid. By subscribing, you agree to our pricing terms.
                        We offer a 7-day money-back guarantee if you're not satisfied.
                    </p>
                </Section>

                <Section number="5" title="Termination" icon={Shield}>
                    <p>
                        We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                </Section>
            </div>
        </LegalLayout>
    );
}
