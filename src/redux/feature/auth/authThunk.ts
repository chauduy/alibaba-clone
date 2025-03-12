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
            return response;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);
