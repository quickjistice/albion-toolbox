import * as items from './translations/items.json';
import * as custom from './translations/custom.json';

export const getChachedStrings = function () {
    // @ts-ignore
    const itemsCache = items.reduce((acc, item) => {
        acc[item.UniqueName] = item;
        return acc;
    }, {});

    // @ts-ignore
    const customCache = custom.reduce((acc, item) => {
        acc[item.UniqueName] = item;
        return acc;
    }, {});

    return Object.assign({}, itemsCache, customCache);
};
