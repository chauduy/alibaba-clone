import { User } from 'firebase/auth';

import { storage } from '@/util';

import { createSlice } from '@reduxjs/toolkit';

import { signUp } from './authThunk';

interface AuthState {
    loading: boolean;
    user: {} | null;
}

const initialState: AuthState = {
    loading: false,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signUp.pending, (state, action) => {
            state.loading = false;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(signUp.rejected, (state, action) => {
            state.loading = false;
        });
    }
});

const { reducer, actions } = authSlice;
export const {} = actions;
export default reducer;
