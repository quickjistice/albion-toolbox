import { Injectable } from '@nestjs/common';

import { FILTER_TYPES } from 'server/constants/filter-type';
import { FilterType, IFilter } from 'src/@types/common';
import { Localization } from 'server/providers/localization/localization.provider';
import { BuildingService } from '../building/building.service';

import { CreateCraftProfitListDto } from './dto/create-craft-profit-list.dto';
import { ReturnCraftProfitListDto } from './dto/return-craft-profit-list.dto';
import { UpdateCraftProfitListDto } from './dto/update-craft-profit-list.dto';

@Injectable()
export class CraftProfitListService {
    constructor(
        private localization: Localization,
        private buildingService: BuildingService,
    ) {}

    create(createCraftProfitListDto: CreateCraftProfitListDto) {
        return 'This action adds a new craftProfitList';
    }

    async findAll(filter: IFilter): Promise<ReturnCraftProfitListDto> {
        const { filterType, category, subcategory } = filter;
        const { categories, subCategories } = await this.getCategories(
            filterType,
        );

        const localize = (key) => {
            if (!key) return null;
            return this.localization.createLocalizedItem(key);
        };

        const items = await this.getItems(filter);

        return {
            filter: {
                type: {
                    items: FILTER_TYPES.map(localize),
                    value: localize(filterType),
                },
                categories: categories
                    ? {
                          items: categories.map(localize),
                          value: localize(category),
                      }
                    : null,
                subcategories: subCategories
                    ? {
                          items: subCategories.map(localize),
                          value: localize(subcategory),
                      }
                    : null,
            },
            items: items,
        };
    }

    findOne(id: number) {
        return `This action returns a #${id} craftProfitList`;
    }

    update(id: number, updateCraftProfitListDto: UpdateCraftProfitListDto) {
        return `This action updates a #${id} craftProfitList`;
    }

    remove(id: number) {
        return `This action removes a #${id} craftProfitList`;
    }

    private async getItems(filter: IFilter) {
        const { filterType } = filter;
        switch (filterType) {
            case 'FILTER_TYPE_CRAFT_BUILDING':
                return this.getCraftBuildingItems(filter);
            default:
                return [];
        }
    }
    private async getCraftBuildingItems(filter: IFilter) {
        const { category } = filter;
        const buildings = category
            ? [await this.buildingService.findOne(category)]
            : await this.buildingService.findAll();

        const itemIds = buildings.reduce((acc, building) => {
            console.log(building);
            acc.push(...building.items);
            return acc;
        }, []);

        return itemIds;
    }

    private async getCategories(filterType: FilterType) {
        switch (filterType) {
            case 'FILTER_TYPE_CRAFT_BUILDING':
                return this.getCraftBuildingCategories();
            default:
                return { categories: null, subCategories: null };
        }
    }

    private async getCraftBuildingCategories() {
        const buildings = await this.buildingService.findByCategory(
            'CRAFT_ITEMS',
        );

        return {
            categories: buildings.map((b) => b.uniquename),
            subCategories: null,
        };
    }
}
