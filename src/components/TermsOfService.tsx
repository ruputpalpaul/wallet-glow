
import { Heart, FileText, HelpCircle } from 'lucide-react';

const TermsSection = ({ number, title, children }: { number: string, title: string, children: React.ReactNode }) => (
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

export function TermsOfService() {
    return (
        <div className="pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-6">
                        <FileText size={12} className="text-rose-500" />
                        Legal stuff, made friendly
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 tracking-tight">
                        Terms of Service
                    </h1>
                    <p className="text-slate-400 font-medium">
                        Last updated: December 15, 2024
                    </p>
                </div>

                {/* Friendly Note Banner */}
                <div className="bg-rose-50 rounded-[2.5rem] p-8 md:p-12 mb-16 border border-rose-100 flex items-start gap-6">
                    <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center text-rose-600 shrink-0">
                        <Heart size={24} className="fill-current" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">A Friendly Note</h3>
                        <p className="text-slate-600 leading-relaxed">
                            While these legal documents can seem overwhelming (hello, ADHD brain!), we've tried to make them as clear and straightforward as possible. The TL;DR is: Use WalletGlow responsibly, and we'll do our best to support you.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-xl shadow-slate-200/50">

                    <TermsSection number="1" title="Acceptance of Terms">
                        <p>By accessing or using WalletGlow (the "Service"), you agree to be bound by these Terms of Service. If you don't agree, please don't use the Service.</p>
                        <p>WalletGlow is a tool to support mindful spending decisions. It's not financial advice, therapy, or a guarantee against impulsive purchases.</p>
                    </TermsSection>

                    <TermsSection number="2" title="Description of Service">
                        <p>WalletGlow provides:</p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-rose-400">
                            <li>A Chrome extension that intercepts checkout pages</li>
                            <li>A mobile application for iOS and Android</li>
                            <li>A web dashboard for insights and tracking</li>
                            <li>Safety checks and cooling-off periods</li>
                            <li>Gamification features and achievement tracking</li>
                        </ul>
                    </TermsSection>

                    <TermsSection number="3" title="User Responsibilities">
                        <p>When using WalletGlow, you agree to:</p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-rose-400">
                            <li><strong>Provide Accurate Information:</strong> Keep your account details current.</li>
                            <li><strong>Protect Your Account:</strong> Keep your password secure and notify us of unauthorized access.</li>
                            <li><strong>Use Responsibly:</strong> Don't attempt to bypass, disable, or manipulate the Service.</li>
                            <li><strong>Respect Others:</strong> Don't use the Service for illegal activities or to harm others.</li>
                        </ul>
                    </TermsSection>

                    <TermsSection number="4" title="Limitations & Disclaimers">
                        <p><strong>Important:</strong> WalletGlow is a support tool, not a complete solution.</p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-rose-400">
                            <li><strong>Not Financial Advice:</strong> WalletGlow doesn't provide professional financial, legal, or therapeutic advice.</li>
                            <li><strong>Not Foolproof:</strong> The Service may not catch every checkout page or prevent every impulsive purchase.</li>
                            <li><strong>No Guarantees:</strong> We don't guarantee specific financial outcomes or savings.</li>
                            <li><strong>Technical Limitations:</strong> The Service relys on browser APIs which can change.</li>
                        </ul>
                    </TermsSection>

                    <TermsSection number="5" title="Privacy & Data">
                        <p>Please review our Privacy Policy to understand how we handle your data.</p>
                    </TermsSection>

                    <TermsSection number="6" title="Intellectual Property">
                        <p>All content, features, and functionality of WalletGlow are owned by us or our licensors.</p>
                        <p>The WalletGlow name, logo, and design are our trademarks.</p>
                    </TermsSection>

                    <TermsSection number="7" title="Service Availability">
                        <p>We strive to keep WalletGlow running smoothly, but:</p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-rose-400">
                            <li>We may experience downtime for maintenance or updates.</li>
                            <li>We may modify or discontinue features with notice.</li>
                            <li>We're not liable for any interruptions or data loss (but we make backups!).</li>
                        </ul>
                    </TermsSection>

                    <TermsSection number="8" title="Payment & Subscriptions">
                        <p>WalletGlow is currently free to use. If we introduce paid features in the future:</p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-rose-400">
                            <li>We'll notify you with at least 30 days notice.</li>
                            <li>Core features will remain free.</li>
                            <li>You can cancel at any time.</li>
                        </ul>
                    </TermsSection>

                    <TermsSection number="9" title="Termination">
                        <p><strong>Your Rights:</strong> You can stop using WalletGlow and delete your account anytime.</p>
                        <p><strong>Our Rights:</strong> We may terminate accounts that violate these Terms, but we'll try to give you notice unless required by law to act immediately.</p>
                    </TermsSection>

                    <TermsSection number="10" title="Limitation of Liability">
                        <p>To the maximum extent permitted by law:</p>
                        <p>WalletGlow and its team are not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. Our total liability is limited to the amount you've paid us in the last 12 months (currently $0, as it's free).</p>
                    </TermsSection>

                    <TermsSection number="11" title="Changes to Terms">
                        <p>We may update these Terms occasionally. Significant changes will be communicated via email or In-App notification at least 30 days before they take effect.</p>
                    </TermsSection>

                    <TermsSection number="12" title="Governing Law">
                        <p>These terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law principles.</p>
                    </TermsSection>

                    <TermsSection number="13" title="Contact & Support">
                        <p>Questions about these Terms?</p>
                        <p>
                            <strong>Email:</strong> support@walletglow.com<br />
                            <strong>Response Time:</strong> Within 48 hours
                        </p>
                    </TermsSection>

                </div>

                {/* Footer Note */}
                <div className="mt-16 text-center">
                    <div className="bg-rose-50 rounded-3xl p-8 max-w-2xl mx-auto border border-rose-100">
                        <div className="flex items-center gap-3 justify-center mb-4 text-rose-600 font-bold">
                            <HelpCircle size={20} />
                            Need Help?
                        </div>
                        <p className="text-slate-600 text-sm mb-0">
                            If you're experiencing financial crisis, compulsive spending, or mental health struggles, please reach out to a licensed professional. WalletGlow is a support tool, but it's not a replacement for professional help. You deserve comprehensive support. 💖
                        </p>
                    </div>
                    <button onClick={() => { window.location.hash = ''; window.scrollTo(0, 0); }} className="mt-8 text-rose-500 hover:text-rose-600 text-sm font-bold hover:underline">
                        ← Back to Home
                    </button>
                </div>

            </div>
        </div>
    );
}
