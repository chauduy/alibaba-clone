import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { toast } from 'sonner';

import { auth, db } from '@/lib/firebase';
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

export const getOrders = createAsyncThunk(
    '/auth/getOrders',
    async (payload: { uid: string }, thunkApi) => {
        try {
            const ordersRef = collection(db, 'customers', payload.uid, 'orders');
            const ordersSnap = await getDocs(ordersRef);
            const orders = ordersSnap.docs.map((doc) => ({
                ...doc.data()
            }));
            return orders || [];
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);
