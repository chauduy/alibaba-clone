import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@/lib/firebase';

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
                uid: user.uid,
                email: user.email
            };
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);
