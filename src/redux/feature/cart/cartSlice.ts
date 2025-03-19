import { Product } from '@/type';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getCart } from './cartThunk';

interface CartProps {
    list: Product[] | null;
    loadingCart: boolean;
}

const initialState: CartProps = {
    list: null,
    loadingCart: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            if (state.list) {
                state.list.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            if (state.list) {
                state.list = state.list.filter((item) => item.id !== action.payload.id);
            }
        },
        plusQuantity: (state, action: PayloadAction<number>) => {
            if (state.list) {
                let findItem = state.list.find((item) => item.id === action.payload);
                if (findItem) {
                    findItem.quantity = findItem.quantity! + 1;
                    state.list = state.list.map((item) =>
                        item.id === findItem.id ? findItem : item
                    );
                }
            }
        },
        minusQuantity: (state, action: PayloadAction<number>) => {
            if (state.list) {
                let findItem = state.list.find((item) => item.id === action.payload);
                if (findItem) {
                    findItem.quantity = findItem.quantity! - 1;
                    state.list = state.list.map((item) =>
                        item.id === findItem.id ? findItem : item
                    );
                }
            }
        },
        clearCart: (state) => {
            state.list = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCart.pending, (state, action) => {
            state.loadingCart = true;
        });
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.loadingCart = false;
            state.list = action.payload;
        });
        builder.addCase(getCart.rejected, (state, action) => {
            state.loadingCart = false;
            state.list = [];
        });
    }
});

const { reducer, actions } = cartSlice;
export const { addToCart, removeFromCart, plusQuantity, minusQuantity, clearCart } = actions;
export default reducer;
