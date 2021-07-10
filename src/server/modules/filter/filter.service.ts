import { Injectable } from '@nestjs/common';
import { FILTER_TYPES } from 'server/constants/filter-type';
import { FilterType } from 'src/@types/common';

import { Localization } from 'src/server/providers/localization/localization.provider';

import { BuildingService } from '../building/building.service';
import { ICategoryItem } from './components/@types';

@Injectable()
export class FilterService {
    constructor(
        private localization: Localization,
        private buildingService: BuildingService,
    ) {}

    async getFilter(params: any) {
        const { filterType } = params;
        const { categories, subCategories } = await this.getCategories(
            filterType,
        );

        return {
            filterType: {
                items: FILTER_TYPES.map((key) => this.createCategoryItem(key)),
                value: this.createCategoryItem(filterType),
            },
            categories: {
                items: categories.map((key) => this.createCategoryItem(key)),
                value: this.createCategoryItem('KEY'),
            },
            subcategories: {
                items: subCategories.map((key) => this.createCategoryItem(key)),
                value: this.createCategoryItem('KEY'),
            },
        };
    }

    private async getCategories(filterType: FilterType) {
        switch (filterType) {
            case 'FILTER_TYPE_SHOPS':
                return this.getCraftBuildingCategories();
            default:
                return { categories: [], subCategories: [] };
        }
    }

    private async getCraftBuildingCategories() {
        const buildings = await this.buildingService.findByCategory(
            'CRAFT_ITEMS',
        );

        return { categories: [], subCategories: [] };
    }

    private createCategoryItem(uniquename: string): ICategoryItem {
        const locale = this.localization.getLocallizedItem(uniquename);

        return {
            uniquename,
            name: locale.name,
            description: locale.description,
        };
    }
}
