import { doc, getDoc } from 'firebase/firestore';

import { db } from '@/lib/firebase';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getCart = createAsyncThunk(
    'cart/getCart',
    async (payload: { uid: string }, thunkApi) => {
        try {
            const userCartRef = doc(db, 'customers', payload.uid, 'cart', 'cartData');
            const cartSnap = await getDoc(userCartRef);
            if (cartSnap.exists()) {
                if (cartSnap.data().list === null) {
                    return [];
                }
                return cartSnap.data().list;
            } else {
                return [];
            }
        } catch (error) {
            thunkApi.rejectWithValue(error);
        }
    }
);
