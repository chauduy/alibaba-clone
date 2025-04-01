import { doc, getDoc } from 'firebase/firestore';

import { db } from '@/lib/firebase';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFavoriteList = createAsyncThunk(
    'favorite/getList',
    async (payload: { uid: string }, thunkApi) => {
        try {
            const listRef = doc(db, 'customers', payload.uid, 'favorite', 'listData');
            const listSnap = await getDoc(listRef);
            if (listSnap.exists()) {
                if (listSnap.data().list === null) {
                    return [];
                }
                return listSnap.data().list;
            } else {
                return [];
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);
