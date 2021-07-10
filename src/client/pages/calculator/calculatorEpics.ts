import { combineEpics, ofType } from "redux-observable";
import {catchError, mergeMap} from "rxjs/operators";
import { fetchCalculatorFilters, updatePageStatus } from "./calculatorSlice";
import { ajax } from "rxjs/ajax";
import { parse, stringifyUrl } from 'query-string';
import { updateFilters } from "../../bloks/craftFilters/craftFiltersSlice";
import { PageStatus } from "../../types/pages";
import {EMPTY} from "rxjs";

const fetchCalculatorFiltersEpic = (action$, store$) => action$.pipe(
    ofType(fetchCalculatorFilters),
    mergeMap((action: ReturnType<typeof fetchCalculatorFilters>) => {
        const { search } = store$.value.router.location;
        const parsed = parse(search);
        const { type, category, subcategory } = parsed;

        const craftProfitListUrl = stringifyUrl({
            url: '/api/craft-profit-list',
            query: { type, category, subcategory }
        });

        return ajax.getJSON(craftProfitListUrl).pipe(
          // TODO add type
            mergeMap((response: any) => {
                return [
                    updateFilters(response.filter),
                    updatePageStatus({ pageStatus: PageStatus.success })
                ];
            }),
            catchError(() => {
                console.log('craft-profit-list error');

               return EMPTY;
            })
        )
    })
);

export const calculatorEpics = combineEpics(
    fetchCalculatorFiltersEpic
);
