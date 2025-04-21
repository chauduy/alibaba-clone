import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
    collection,
    doc,
    DocumentData,
    getCountFromServer,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    queryEqual,
    startAfter,
    startAt
} from 'firebase/firestore';
import { toast } from 'sonner';

import { auth, db } from '@/lib/firebase';
import { OrderProps } from '@/type';
import { customToast } from '@/util';

import { createAsyncThunk } from '@reduxjs/toolkit';

interface AuthPayload {
    email: string;
    password: string;
}

export const signUp = createAsyncThunk(
    'auth/registration',
    async (payload: AuthPayload, thunkApi) => {
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                payload.email,
                payload.password
            );
            const user = response.user;
            const token = await user.getIdToken();
            return {
                uid: user.uid,
                token: token
            };
        } catch (error) {
            toast.error('User existed', customToast('error'));
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const signIn = createAsyncThunk('auth/signIn', async (payload: AuthPayload, thunkApi) => {
    try {
        const response = await signInWithEmailAndPassword(auth, payload.email, payload.password);
        const user = response.user;
        const token = await user.getIdToken();
        return {
            uid: user.uid,
            token: token
        };
    } catch (error) {
        toast.error('Invalid email or password', customToast('error'));
        return thunkApi.rejectWithValue(error);
    }
});

export const logOut = createAsyncThunk('auth/logOut', async (payload, thunkApi) => {
    try {
        const response = await signOut(auth);
        return response;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const getUserInfo = createAsyncThunk(
    'auth/getInfo',
    async (payload: { uid: string }, thunkApi) => {
        try {
            const response = await getDoc(doc(db, 'customers', payload.uid));
            return response.data();
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const countOrders = createAsyncThunk(
    'auth/countOrders',
    async (payload: { uid: string }, thunkApi) => {
        try {
            const ordersRef = collection(db, 'customers', payload.uid, 'orders');
            const snapshot = await getCountFromServer(ordersRef);
            return snapshot.data().count;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const getOrders = createAsyncThunk(
    '/auth/getOrders',
    async (
        payload: {
            uid: string;
            firstItem?: OrderProps;
            lastItem?: OrderProps;
            direction?: 'next' | 'prev';
        },
        thunkApi
    ) => {
        try {
            const ordersRef = collection(db, 'customers', payload.uid, 'orders');
            let q;
            const baseQuery = orderBy('order_time', 'desc');
            const previewOrdersQuery = query(ordersRef, baseQuery, limit(5));

            if (!payload.firstItem && !payload.lastItem) {
                q = query(ordersRef, baseQuery, limit(5));
            } else if (payload.direction === 'next' && payload.lastItem) {
                q = query(ordersRef, baseQuery, startAfter(payload.lastItem.order_time), limit(5));
            } else if (payload.direction === 'prev' && payload.firstItem) {
                q = query(
                    ordersRef,
                    orderBy('order_time', 'asc'),
                    startAfter(payload.firstItem.order_time),
                    limit(5)
                );
            } else {
                q = query(ordersRef, baseQuery, limit(5));
            }

            const ordersSnap = await getDocs(q);
            const previewOrderSnap = await getDocs(previewOrdersQuery);
            let orders = ordersSnap.docs.map((doc) => ({
                ...(doc.data() as OrderProps),
                id: doc.id
            }));
            const previewOrders = previewOrderSnap.docs.map((doc) => ({
                ...(doc.data() as OrderProps),
                id: doc.id
            }));

            // If going backward, reverse the list to maintain descending order
            if (payload.direction === 'prev') {
                orders = orders.reverse();
            }

            return { orders, previewOrders };
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);
