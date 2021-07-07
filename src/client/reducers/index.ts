import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import craftFilter from "../bloks/craftFilter/craftFilterSlice";

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    craftFilter: craftFilter
})

export default rootReducer;
