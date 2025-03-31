import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import Stripe from 'stripe';

admin.initializeApp();

const stripe = new Stripe(
    'sk_test_51R3HCyI8gDrJXWTogMNubhtvfT55jsEDiaETkMjpMMNZUWvymPR8iMv8FducmDVtmf6wjdX8INy1mzRu3MwEbrZS00gMBXUrYJ' as string,
    {
        apiVersion: '2023-10-16' as Stripe.LatestApiVersion
    }
);

interface LineItem {
    name: string;
    price: number;
    quantity: number;
}

interface RequestBody {
    uid: string;
    items: LineItem[];
    code: string;
}

export const createCheckoutSession = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    try {
        const { uid, items, code } = req.body as RequestBody;

        if (!uid) {
            res.status(401).send('Unauthorized');
            return;
        }

        const user = await admin.auth().getUser(uid);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: { name: item.name },
                unit_amount: item.price
            },
            quantity: item.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `https://ali-eco.vercel.app/payment/success?code=${code}`,
            cancel_url: `https://ali-eco.vercel.app/payment/cancel?code=${code}`,
            metadata: { uid }
        });

        res.json({ url: session.url });
        return;
    } catch (error) {
        res.status(500).json({ error: (error as Error).message || 'Internal Server Error' });
        return;
    }
});
