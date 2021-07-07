import { Injectable } from '@nestjs/common';

import { BuildingService } from 'src/server/providers/building/building.service';
import { Localization } from 'src/server/providers/localization/localization.provider';

import { getMainCategory } from './utils/get-main.category';

interface IGetFilterParams {
    mainCategory?: string;
}

@Injectable()
export class FilterService {
    constructor(
        private localization: Localization,
        private buildingsService: BuildingService,
    ) {}

    async getFilter(params: IGetFilterParams) {
        const { mainCategory } = params;
        const buildings = await this.buildingsService.getAll();

        return {
            selected: { mainCategory },
            mainCategory: getMainCategory().map((uniqname) => {
                const locale = this.localization.getLocallizedItem(uniqname);

                return {
                    uniqname,
                    name: locale.name,
                    description: locale.description,
                };
            }),
            tmp: buildings,
        };
    }
}
