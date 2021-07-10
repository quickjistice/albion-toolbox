import { readFileSync } from 'fs';
import { resolve } from 'path';

import { ENTITY_TYPE } from '.';

const SUPPORTED_LOCALES = ['EN-US', 'RU-RU'];

export function convertLocalization(rawLocalization) {
    const locHash = createLocHash(rawLocalization);

    const result = [];
    const items = load(ENTITY_TYPE.ITEMS);
    for (const item of items) {
        result.push(getTranslation(item, locHash, '@ITEMS_'));
    }

    const buildings = load(ENTITY_TYPE.BUILDINGS);
    for (const building of buildings) {
        result.push(getTranslation(building, locHash, '@BUILDINGS_'));
    }

    return result;
}

function getTranslation(item, locHash, prefix) {
    const locale = locHash[prefix + item.uniquename];
    const localeDescription =
        locHash[prefix + item.uniquename + '_DESC'] ||
        locHash[prefix + item.uniquename + '_BP'];

    return {
        uniquename: item.uniquename,
        name: SUPPORTED_LOCALES.reduce((acc, localeName) => {
            acc[localeName] = locale.translation[localeName];
            return acc;
        }, {}),
        description: SUPPORTED_LOCALES.reduce((acc, localeName) => {
            acc[localeName] = localeDescription
                ? localeDescription.translation[localeName]
                : '';
            return acc;
        }, {}),
    };
}

function createLocHash(rawLocalization) {
    return rawLocalization.tmx.body.tu.reduce((acc, rawItem) => {
        if (!Array.isArray(rawItem.tuv)) {
            return acc;
        }

        acc[rawItem['@tuid']] = {
            uniquename: rawItem['@tuid'],
            translation: rawItem.tuv.reduce((acc, translation) => {
                acc[translation['@xml:lang']] = translation['seg'];
                return acc;
            }, {}),
        };

        return acc;
    }, {});
}

function load(type: ENTITY_TYPE) {
    return JSON.parse(
        readFileSync(
            resolve(__dirname, `../ao-parsed-data/${type.toLowerCase()}.json`),
            'utf-8',
        ),
    );
}
