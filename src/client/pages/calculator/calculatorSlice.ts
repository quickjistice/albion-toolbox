import { createSlice } from "@reduxjs/toolkit";
import { PageStatus } from "../../types/pages";

export const slice = createSlice({
    name: 'calculatorPage',
    initialState: {
        pageStatus: PageStatus.initial,
    },
    reducers: {
        updatePageStatus: (state, action) => {
            state.pageStatus = action.payload.pageStatus;
        },
        fetchCalculatorFilters: (state) => {
            state.pageStatus = PageStatus.loading;
        },
    },
});

export const updatePageStatus = slice.actions.updatePageStatus;
export const fetchCalculatorFilters = slice.actions.fetchCalculatorFilters;

export default slice.reducer;
