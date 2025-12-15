
import { useState } from 'react';
import { Mail, MessageCircle, ChevronDown, ChevronUp, Send } from 'lucide-react';

export function SupportPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');
        // Simulate sending
        setTimeout(() => {
            setFormStatus('sent');
        }, 1500);
    };

    const faqs = [
        {
            question: "How does the impulse blocker work?",
            answer: "Our extension detects when you're on a shopping site and gently intercepts the 'Add to Cart' or 'Checkout' process. It shows you a mindful pause screen, asking if you really need the item, helping you break the impulse cycle."
        },
        {
            question: "Can I whitelist certain sites?",
            answer: "Yes! You have full control. You can whitelist specific URLs or pause the extension entirely for a set period if you need to make a planned purchase."
        },
        {
            question: "Is my data safe?",
            answer: "Absolutely. We prioritize your privacy. Your browsing history stays on your device. We only sync necessary data (like your subscription status and saved budget goals) to our secure database if you create an account."
        },
        {
            question: "How do I cancel my subscription?",
            answer: "You can manage your subscription directly from your Dashboard. There is a 'Manage Subscription' button that will take you to the Stripe portal where you can cancel anytime."
        }
    ];

    return (
        <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-rose-950 mb-4">
                    How can we help? 🎀
                </h1>
                <p className="text-xl text-slate-600">
                    We're here to support your journey to mindful spending.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-rose-100">
                    <h2 className="text-2xl font-bold text-rose-900 mb-6 flex items-center gap-2">
                        <Mail className="text-rose-400" /> parseMessage
                    </h2>

                    {formStatus === 'sent' ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Send size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                            <p className="text-slate-600">We'll get back to you as soon as possible via email.</p>
                            <button
                                onClick={() => setFormStatus('idle')}
                                className="mt-6 text-rose-500 hover:text-rose-600 font-medium"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSendMessage} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-rose-200 transition-all outline-none"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-rose-200 transition-all outline-none"
                                    placeholder="hello@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-rose-200 transition-all outline-none resize-none"
                                    placeholder="Tell us what's on your mind..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={formStatus === 'sending'}
                                className="w-full py-3 bg-rose-400 hover:bg-rose-500 text-white rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                                {!formStatus && <Send size={18} />}
                            </button>
                        </form>
                    )}
                </div>

                {/* FAQ Section */}
                <div>
                    <h2 className="text-2xl font-bold text-rose-900 mb-6 flex items-center gap-2">
                        <MessageCircle className="text-rose-400" /> FAQ
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl border border-rose-100 overflow-hidden transition-all hover:shadow-md cursor-pointer"
                                onClick={() => toggleFaq(idx)}
                            >
                                <div className="p-5 flex items-center justify-between">
                                    <h3 className="font-semibold text-slate-800">{faq.question}</h3>
                                    {openFaq === idx ? <ChevronUp className="text-rose-400" /> : <ChevronDown className="text-rose-400" />}
                                </div>
                                {openFaq === idx && (
                                    <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-16 text-center bg-rose-50 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-rose-900 mb-2">Still need help?</h3>
                <p className="text-slate-600 mb-6">
                    You can also email us directly at <a href="mailto:support@walletglow.com" className="text-rose-500 hover:underline font-medium">support@walletglow.com</a>
                </p>
            </div>
        </div>
    );
}
