import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
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
            return {
                uid: user.uid
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
        return {
            uid: user.uid
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
