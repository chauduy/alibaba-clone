import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { onRequest } from 'firebase-functions/v2/https';
import Stripe from 'stripe';

admin.initializeApp();

const stripe = new Stripe(functions.config().stripe.secret as string, {
    apiVersion: '2023-10-16' as Stripe.LatestApiVersion // Ensures the latest API version
});

interface LineItem {
    name: string;
    price: number;
    quantity: number;
}

interface RequestBody {
    uid: string;
    items: LineItem[];
}

export const createCheckoutSession = onRequest(async (req, res): Promise<void> => {
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    try {
        const { uid, items } = req.body as RequestBody;

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
                unit_amount: item.price * 100 // Convert to cents
            },
            quantity: item.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: 'https://yourdomain.com/success',
            cancel_url: 'https://yourdomain.com/cancel',
            metadata: { uid }
        });

        res.json({ url: session.url });
        return;
    } catch (error) {
        const errorMessage = (error as Error).message || 'Internal Server Error';
        res.status(500).json({ error: errorMessage });
        return;
    }
});
