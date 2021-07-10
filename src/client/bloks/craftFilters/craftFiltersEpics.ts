import { combineEpics, ofType } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import { craftFiltersChange } from "../../bloks/craftFilters/craftFiltersSlice";
import { replace } from "connected-react-router";
import { PagePath} from "../../types/pages";
import { stringifyUrl } from "query-string";

const craftFiltersChangeEpic = (action$, store$) => action$.pipe(
    ofType(craftFiltersChange),
    mergeMap((action: ReturnType<typeof craftFiltersChange>) => {
        const craftProfitListUrl = stringifyUrl({
            url: PagePath.calculator,
            query: action.payload
        });


        return [replace(craftProfitListUrl)];
    })
);

export const craftFiltersEpics = combineEpics(
    craftFiltersChangeEpic
);
