import { Injectable } from '@nestjs/common';

import { Localization } from 'src/server/providers/localization/localization.provider';

import { getMainCategory } from './utils/get-main.category';

@Injectable()
export class FilterService {
    constructor(private localization: Localization) {}

    getFilter() {
        return {
            mainCategory: getMainCategory().map((uniqname) => {
                const locale = this.localization.getLocallizedItem(uniqname);

                return {
                    uniqname,
                    name: locale.name,
                    description: locale.description,
                };
            }),
        };
    }
}
