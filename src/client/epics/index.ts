import { combineEpics } from "redux-observable";
import { commonEpics } from "./common";
import { calculatorEpics } from "../pages/calculator/calculatorEpics";
import { craftFiltersEpics } from "../bloks/craftFilters/craftFiltersEpics";

const rootEpics = combineEpics(
    commonEpics,
    calculatorEpics,
    craftFiltersEpics
);

export default rootEpics;
