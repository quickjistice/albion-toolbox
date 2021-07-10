import { createSlice } from "@reduxjs/toolkit";

const initialFiltersValue = {
    type: {
        items: [],
        value: {}
    },
    categories: {
        items: [],
        value: {}
    },
    subcategories: {
        items: [],
        value: {}
    }
}

export const slice = createSlice({
    name: 'craftFilters',
    initialState: {
        filters: initialFiltersValue,
    },
    reducers: {
        updateFilters: (state, action) => {
            state.filters = { ...initialFiltersValue, ...action.payload };
        },
        craftFiltersChange: (state, action) => {},
    },
});

export const updateFilters = slice.actions.updateFilters;
export const craftFiltersChange = slice.actions.craftFiltersChange;

export const selectFilters = state => state.craftFilters.filters;

export default slice.reducer;
