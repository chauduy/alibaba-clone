import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: '123123' },
    reducers: {},
    extraReducers: () => {}
});

const { reducer, actions } = authSlice;
export const {} = actions;
export default reducer;
