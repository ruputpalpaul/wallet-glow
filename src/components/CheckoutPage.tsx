
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe outside component to avoid recreation
// Replace with your actual Publishable Key from Stripe Dashboard
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_TYooMQauvdEDq54NiTphI7jx');

// Helper to manually parse query params
const useHashQuery = () => {
    const [query, setQuery] = useState<Record<string, string>>({});
    useEffect(() => {
        const parseHash = () => {
            const hash = window.location.hash;
            if (hash.includes('?')) {
                const search = hash.split('?')[1];
                const params = new URLSearchParams(search);
                const q: Record<string, string> = {};
                params.forEach((val, key) => { q[key] = val; });
                setQuery(q);
            }
        };
        parseHash();
        window.addEventListener('hashchange', parseHash);
        return () => window.removeEventListener('hashchange', parseHash);
    }, []);
    return query;
};

// Internal Form Component
const CheckoutForm = ({ plan, email }: { plan: string, email: string }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Return to success page
                return_url: `${window.location.origin}/#success`,
                payment_method_data: {
                    billing_details: {
                        email: email || undefined,
                    }
                }
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message || "An unexpected error occurred.");
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            {message && <div className="text-red-500 text-sm">{message}</div>}
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-400 to-rose-500 text-white font-bold text-lg shadow-xl shadow-rose-200 hover:shadow-2xl hover:shadow-rose-300/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                    plan === 'monthly' ? 'Start Free Trial' : 'Pay $50.00'
                )}
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">
                Payments secured by Stripe. By subscribing you agree to our Terms.
            </p>
        </form>
    );
};

export const CheckoutPage = () => {
    const query = useHashQuery();
    const plan = query.plan || 'monthly';
    const [email, setEmail] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Prefill email
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user?.email) setEmail(user.email);
            // Fetch PaymentIntent immediately if user is known? 
            // Better to fetch once we are ready or immediately on load
        });
    }, []);

    useEffect(() => {
        // Create PaymentIntent as soon as page loads (or when plan changes)
        const createIntent = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                const res = await fetch('/api/create-payment-intent', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        plan,
                        userId: user?.id,
                        email: user?.email || email
                    }),
                });

                if (!res.ok) throw new Error('Failed to init payment');

                const data = await res.json();
                setClientSecret(data.clientSecret);
            } catch (err) {
                console.error("Error creating payment intent", err);
            }
        };

        createIntent();
    }, [plan]); // Re-create if plan changes (amount changes)

    const isMonthly = plan === 'monthly';

    const appearance = {
        theme: 'stripe' as const,
        variables: {
            colorPrimary: '#f43f5e', // rose-500
            colorBackground: '#ffffff',
            colorText: '#1e293b', // slate-800
            borderRadius: '12px',
        },
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="min-h-screen pt-24 pb-20 flex items-center justify-center bg-[#fffdf9] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-rose-50/50 rounded-full blur-3xl opacity-60" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-3xl opacity-60" />
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 max-w-lg w-full relative z-10 animate-fade-in-up">

                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                            <Sparkles size={16} className="text-rose-500" />
                        </div>
                        <span className="font-bold text-slate-900 text-lg">WalletGlow</span>
                    </div>
                    <button onClick={() => window.history.back()} className="text-slate-400 hover:text-slate-600 transition-colors">
                        ✕
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    {isMonthly ? 'Start your free trial' : 'Get Lifetime Access'}
                </h1>
                <p className="text-slate-500 mb-8">
                    {isMonthly ? 'Free for 7 days, then $4.99/month' : 'One-time payment of $50, yours forever'}
                </p>

                {/* Plan Summary Card */}
                <div className="bg-rose-50/50 rounded-3xl p-6 border border-rose-100 mb-8">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="text-xs text-rose-400 font-bold uppercase tracking-wider mb-1">Plan</div>
                            <div className="text-lg font-bold text-slate-900">{isMonthly ? 'Monthly Plan' : 'Lifetime Access'}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-slate-900">{isMonthly ? '$4.99' : '$50.00'}</div>
                            <div className="text-xs text-slate-500">{isMonthly ? 'per month' : 'one-time'}</div>
                        </div>
                    </div>

                    {isMonthly && (
                        <div className="bg-white rounded-xl p-4 flex items-start gap-3 shadow-sm border border-rose-100/50">
                            <div className="text-blue-400 mt-0.5">ℹ️</div>
                            <div className="text-xs text-slate-500 leading-relaxed">
                                <span className="font-bold text-slate-700">Trial ends {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                                <br />
                                You'll be charged $4.99 unless you cancel before then. Cancel anytime from your account settings.
                            </div>
                        </div>
                    )}
                </div>

                {/* Secure Payment Form */}
                <div className="min-h-[300px]">
                    {clientSecret ? (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm plan={plan} email={email} />
                        </Elements>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full space-y-4 text-slate-400">
                            <div className="animate-spin h-8 w-8 border-4 border-rose-200 border-t-rose-500 rounded-full" />
                            <p className="text-sm">Initializing Secure Checkout...</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
