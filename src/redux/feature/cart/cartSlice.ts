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
        },
        plusQuantity: (state, action: PayloadAction<number>) => {
            let findItem = state.list.find((item) => item.id === action.payload);
            if (findItem) {
                findItem.quantity = findItem.quantity! + 1;
                state.list = state.list.map((item) => (item.id === findItem.id ? findItem : item));
            }
            storage.setItem('list', JSON.stringify(state.list));
        },
        minusQuantity: (state, action: PayloadAction<number>) => {
            let findItem = state.list.find((item) => item.id === action.payload);
            if (findItem) {
                findItem.quantity = findItem.quantity! - 1;
                state.list = state.list.map((item) => (item.id === findItem.id ? findItem : item));
            }
            storage.setItem('list', JSON.stringify(state.list));
        }
    },
    extraReducers: () => {}
});

const { reducer, actions } = cartSlice;
export const { addToCart, removeFromCart, plusQuantity, minusQuantity } = actions;
export default reducer;
