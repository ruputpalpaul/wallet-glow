
import { Shield, EyeOff, FileText, Heart, Lock } from 'lucide-react';

const PrivacySection = ({ number, title, children }: { number: string, title: string, children: React.ReactNode }) => (
    <div className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold text-sm flex items-center justify-center border border-slate-200">
                {number}
            </span>
            {title}
        </h2>
        <div className="pl-11 text-slate-600 leading-relaxed space-y-4">
            {children}
        </div>
    </div>
);

export function PrivacyPolicy() {
    return (
        <div className="pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-6">
                        <Lock size={12} className="text-rose-500" />
                        Your privacy matters
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-slate-400 font-medium">
                        Last updated: December 15, 2024
                    </p>
                </div>

                {/* Privacy Promise Banner */}
                <div className="bg-gradient-to-r from-rose-50 via-white to-indigo-50 rounded-[2.5rem] p-8 md:p-12 mb-16 border border-rose-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-8 text-center md:text-left">Our Privacy Promise</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-rose-200 rounded-2xl flex items-center justify-center mx-auto mb-4 text-rose-600">
                                <Shield size={24} />
                            </div>
                            <div className="font-bold text-slate-800 text-sm mb-1">We never sell your data</div>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600">
                                <EyeOff size={24} />
                            </div>
                            <div className="font-bold text-slate-800 text-sm mb-1">No third-party tracking</div>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4 text-purple-600">
                                <FileText size={24} />
                            </div>
                            <div className="font-bold text-slate-800 text-sm mb-1">Minimal data collection</div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-xl shadow-slate-200/50">

                    <PrivacySection number="1" title="Information We Collect">
                        <p>WalletGlow is designed to work locally on your device whenever possible. We collect minimal information necessary to provide our service.</p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-rose-400">
                            <li><strong>Account Information:</strong> Email address and encrypted password for account creation.</li>
                            <li><strong>Usage Data:</strong> Metrics about feature usage to improve the app (no personal identifying information).</li>
                            <li><strong>Shopping Patterns:</strong> Trigger domains and spending insights are stored locally on your device by default.</li>
                            <li><strong>Achievement Progress:</strong> Gamification data to track your milestones.</li>
                        </ul>
                    </PrivacySection>

                    <PrivacySection number="2" title="How We Use Your Information">
                        <p>Your information is used exclusively to provide and improve WalletGlow.</p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-rose-400">
                            <li>Deliver the cooling-off period and reality check features.</li>
                            <li>Sync your data across devices (if you enable this feature).</li>
                            <li>Provide personalized insights about your spending patterns.</li>
                            <li>Send important service updates (you can opt out of non-essential emails).</li>
                        </ul>
                    </PrivacySection>

                    <PrivacySection number="3" title="Information Sharing & Disclosure">
                        <p><strong>We do not sell, rent, or trade your personal information. Ever.</strong></p>
                        <p>We only share information in these limited circumstances:</p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-rose-400">
                            <li><strong>With Your Consent:</strong> We'll ask before sharing your information for any reason not covered here.</li>
                            <li><strong>Service Providers:</strong> To help us operate (e.g., cloud hosting), bound by strict confidentiality agreements.</li>
                            <li><strong>Legal Requirements:</strong> Only if required by law or to protect rights and safety.</li>
                        </ul>
                    </PrivacySection>

                    <PrivacySection number="4" title="Data Security">
                        <p>We take security seriously because your financial patterns are deeply personal.</p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-rose-400">
                            <li>All data is encrypted in transit (TLS/SSL) and at rest.</li>
                            <li>Passwords are hashed using industry-standard encryption.</li>
                            <li>Regular security audits and updates.</li>
                        </ul>
                    </PrivacySection>

                    <PrivacySection number="5" title="Your Rights & Choices">
                        <p>You have complete control over your data:</p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-rose-400">
                            <li><strong>Access:</strong> Request a copy of all your data at any time.</li>
                            <li><strong>Deletion:</strong> Delete your account and all associated data permanently.</li>
                            <li><strong>Portability:</strong> Export your data in a readable format.</li>
                            <li><strong>Local-Only Mode:</strong> Use WalletGlow with zero cloud sync.</li>
                        </ul>
                    </PrivacySection>

                    <PrivacySection number="6" title="Cookies & Tracking">
                        <p>We use minimal, essential cookies for functionality (like keeping you logged in). We do NOT use third-party advertising cookies or tracking pixels. You can control cookie preferences in your browser settings.</p>
                    </PrivacySection>

                    <PrivacySection number="7" title="Children's Privacy">
                        <p>WalletGlow is not intended for users under 13 years old. We do not knowingly collect information from children. If you believe we've inadvertently collected such information, please contact us immediately.</p>
                    </PrivacySection>

                    <PrivacySection number="8" title="Changes to This Policy">
                        <p>We may update this privacy policy occasionally. We'll notify you of significant changes via email or in-app notification. Continued use after changes means you accept the updated policy.</p>
                    </PrivacySection>

                    <PrivacySection number="9" title="Contact Us">
                        <p>Questions about privacy? We're here to help:</p>
                        <p>
                            <strong>Email:</strong> privacy@walletglow.com<br />
                            <strong>Response Time:</strong> Within 48 hours
                        </p>
                    </PrivacySection>

                </div>

                {/* Footer Note */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-2 text-slate-400 text-sm bg-slate-50 px-6 py-3 rounded-full border border-slate-100">
                        <Heart size={14} className="text-rose-400 fill-rose-400" />
                        Built with respect for your privacy
                    </div>
                    <p className="mt-4 text-xs text-slate-300 max-w-md mx-auto">
                        Your trust matters to us. If you have questions or concerns, we're always here to listen.
                    </p>
                    <button onClick={() => { window.location.hash = ''; window.scrollTo(0, 0); }} className="mt-8 text-rose-500 hover:text-rose-600 text-sm font-bold hover:underline">
                        ← Back to Home
                    </button>
                </div>

            </div>
        </div>
    );
}
