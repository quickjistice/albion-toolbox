import { Injectable, Global } from '@nestjs/common';

import { getChachedStrings } from './get-cached-strings';

const stringsCache = getChachedStrings();

export enum Locale {
    EN = 'EN-US',
    RU = 'RU-RU',
}

export interface ILocalizedItem {
    uniquename: string;
    name: string;
    description: string;
}

@Global()
@Injectable()
export class Localization {
    getLocallizedItem(
        uniquename: string,
        locale = Locale.RU,
    ): { name: string; description: string } {
        const item = stringsCache[uniquename];

        if (!item)
            return {
                name: uniquename,
                description: uniquename + '_DESC',
            };

        return {
            name: item.name[locale],
            description: item.description[locale],
        };
    }

    createLocalizedItem(uniquename: string): ILocalizedItem {
        const locale = this.getLocallizedItem(uniquename);

        return {
            uniquename,
            name: locale.name,
            description: locale.description,
        };
    }
}
