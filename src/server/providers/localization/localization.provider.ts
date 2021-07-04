import { Injectable, Global } from '@nestjs/common';
import { getChachedStrings } from './get-cached-strings';

const stringsCache = getChachedStrings();

enum Locale {
    en = 'EN-US',
    ru = 'RU-RU',
}

@Global()
@Injectable()
export class Localization {
    getLocallizedItem(uniqname: string, locale = 'ru') {
        const item = stringsCache[uniqname];

        if (!item)
            return {
                name: uniqname,
                description: uniqname + '_DESCRIPTION',
            };

        return {
            name: item.LocalizedNames[Locale[locale]],
            description: item.LocalizedDescriptions[Locale[locale]],
        };
    }
}
