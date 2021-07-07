import { filter, mergeMap } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";
import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { EMPTY } from "rxjs";

const locationChangeEpic = action$ => action$.pipe(
    ofType(LOCATION_CHANGE),
    filter((action: LocationChangeAction) => {
        return action.payload.location.pathname === '/calculator';
    }),
    mergeMap(() => {
        return EMPTY;
    })
);

export const commonEpics = combineEpics(
    locationChangeEpic
);
