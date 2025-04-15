import { UserInfo } from '@/type';
import { storage } from '@/util';

import { createSlice } from '@reduxjs/toolkit';

import { getOrders, getUserInfo, logOut, signIn, signUp } from './authThunk';

interface AuthState {
    loading: boolean;
    user: UserInfo | null;
    orders?: Array<any> | null;
}

const initialState: AuthState = {
    loading: false,
    user: JSON.parse(storage.getItem('user') as string) as UserInfo | null,
    orders: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signUp.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            storage.setItem('user', JSON.stringify(action.payload));
        });
        builder.addCase(signUp.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(signIn.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            storage.setItem('user', JSON.stringify(action.payload));
        });
        builder.addCase(signIn.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(logOut.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.loading = false;
            state.user = null;
            storage.clear();
        });
        builder.addCase(logOut.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(getUserInfo.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.loading = false;
            const userInfo = {
                uid: state.user?.uid!,
                token: state.user?.token!,
                ...action.payload
            };
            state.user = userInfo;
            storage.setItem('user', JSON.stringify(userInfo));
        });
        builder.addCase(getUserInfo.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(getOrders.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        });
        builder.addCase(getOrders.rejected, (state, action) => {
            state.loading = false;
        });
    }
});

const { reducer, actions } = authSlice;
export const {} = actions;
export default reducer;
