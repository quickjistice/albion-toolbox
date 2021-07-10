import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import craftFilters from "../bloks/craftFilters/craftFiltersSlice";
import calculatorPage from "../pages/calculator/calculatorSlice";

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    craftFilters: craftFilters,
    calculatorPage: calculatorPage,
})

export default rootReducer;
