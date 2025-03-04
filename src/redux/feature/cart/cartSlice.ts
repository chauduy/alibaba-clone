import { Product } from '@/type';
import { storage } from '@/util';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartProps {
    list: Product[];
}

const initialState: CartProps = {
    list: JSON.parse(storage.getItem('list') || '[]') as Product[]
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            state.list.push(action.payload);
            storage.setItem('list', JSON.stringify(state.list));
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            state.list = state.list.filter((item) => item.id !== action.payload.id);
            storage.setItem('list', JSON.stringify(state.list));
        }
    },
    extraReducers: () => {}
});

const { reducer, actions } = cartSlice;
export const { addToCart, removeFromCart } = actions;
export default reducer;
