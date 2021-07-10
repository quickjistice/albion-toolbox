import { filter, mergeMap } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";
import {
    CALL_HISTORY_METHOD,
    CallHistoryMethodAction,
    LOCATION_CHANGE,
    LocationChangeAction
} from "connected-react-router";
import { PagePath } from "../types/pages";
import { fetchCalculatorFilters } from "../pages/calculator/calculatorSlice";
import { parseUrl } from "query-string";

const locationChangeEpic = action$ => action$.pipe(
    ofType(LOCATION_CHANGE),
    filter((action: LocationChangeAction) => {
        return action.payload.location.pathname === PagePath.calculator;
    }),
    mergeMap(() => {
        return [fetchCalculatorFilters()];
    })
);

const callHistoryMethodEpic = action$ => action$.pipe(
    ofType(CALL_HISTORY_METHOD),
    filter((action: CallHistoryMethodAction) => {
        const parsed = parseUrl(action.payload.args[0]);

        return parsed.url === PagePath.calculator;
    }),
    mergeMap(() => {
        return [fetchCalculatorFilters()];
    })
);

export const commonEpics = combineEpics(
    locationChangeEpic,
    callHistoryMethodEpic
);
