import { Injectable } from '@nestjs/common';

import { Localization } from 'src/server/providers/localization/localization.provider';

import { BuildingService } from '../building/building.service';
import { getMainCategory } from './utils/get-main.category';

interface IGetFilterParams {
    mainCategory?: string;
}

@Injectable()
export class FilterService {
    constructor(
        private localization: Localization,
        private buildingService: BuildingService,
    ) {}

    async getFilter(params: IGetFilterParams) {
        const { mainCategory } = params;
        const buildings = await this.buildingService.getByCategory(
            'CRAFT_ITEMS',
        );

        return {
            selected: { mainCategory },
            mainCategories: getMainCategory().map((uniquename) => {
                const locale = this.localization.getLocallizedItem(uniquename);

                return {
                    uniquename,
                    name: locale.name,
                    description: locale.description,
                };
            }),
            categories: buildings.map((building) => {
                const locale = this.localization.getLocallizedItem(
                    building.uniquename,
                );

                return {
                    uniquename: building.uniquename,
                    name: locale.name,
                    description: locale.description,
                };
            }),
        };
    }
}
