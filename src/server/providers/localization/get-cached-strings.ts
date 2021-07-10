import * as items from './translations/localization.json';
import * as custom from './translations/custom.json';

export const getChachedStrings = function () {
    const itemsCache = items.reduce((acc, item) => {
        acc[item.uniquename] = item;
        return acc;
    }, {});

    const customCache = custom.reduce((acc, item) => {
        acc[item.uniquename] = item;
        return acc;
    }, {});

    return Object.assign({}, itemsCache, customCache);
};
