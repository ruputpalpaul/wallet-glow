import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // In production, replace '*' with your actual domain
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(500).json({ error: "Missing Server STRIPE_SECRET_KEY" });
    }

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    try {
        const { plan, userId, email } = req.body;

        let amount = 499; // Default Monthly $4.99
        if (plan === 'lifetime') {
            amount = 5000; // Lifetime $50.00
        }

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                userId: userId || 'guest',
                plan: plan,
                email: email
            },
            receipt_email: email || undefined,
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: e.message });
    }
}
