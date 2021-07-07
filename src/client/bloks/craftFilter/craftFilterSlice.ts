import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'craftFilter',
    initialState: {
        category: '',
    },
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },
    },
});

export const setCategory = slice.actions.setCategory;

export const selectCategory = state => state.craftFilter.category;

export default slice.reducer;
