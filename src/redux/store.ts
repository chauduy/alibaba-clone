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
                ignoredActions: ['/auth/getOrders/fulfilled', 'auth/setUser'],
                ignoredPaths: [
                    'auth.orders',
                    'auth.lastItem',
                    'auth.firstItem',
                    'auth.previewOrders',
                    'auth.user'
                ]
            }
        })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
