import { configureStore } from '@reduxjs/toolkit';

import authReducer from './feature/auth/authSlice';
import cartReducer from './feature/cart/cartSlice';
import favoriteReducer from './feature/favorite/favoriteSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        favorite: favoriteReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['/auth/getOrders/fulfilled'],
                ignoredPaths: ['auth.orders']
            }
        })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
