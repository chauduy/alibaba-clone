import { Product } from '@/type';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getFavoriteList } from './favoriteThunk';

interface FavoriteProps {
    favoriteList: Product[] | null;
    loadingFavorite: boolean;
}

const initialState: FavoriteProps = {
    favoriteList: null,
    loadingFavorite: false
};

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addToList: (state, action: PayloadAction<Product>) => {
            if (state.favoriteList) {
                state.favoriteList.push(action.payload);
            }
        },
        removeFromList: (state, action: PayloadAction<Product>) => {
            if (state.favoriteList) {
                state.favoriteList = state.favoriteList.filter(
                    (item) => item.id !== action.payload.id
                );
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFavoriteList.pending, (state, action) => {
            state.loadingFavorite = true;
        });
        builder.addCase(getFavoriteList.fulfilled, (state, action) => {
            state.loadingFavorite = false;
            state.favoriteList = action.payload;
        });
        builder.addCase(getFavoriteList.rejected, (state, action) => {
            state.loadingFavorite = false;
        });
    }
});

const { reducer, actions } = favoriteSlice;
export const { addToList, removeFromList } = actions;
export default reducer;
