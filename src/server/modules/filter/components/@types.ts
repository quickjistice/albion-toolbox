export enum FILTER_TYPE {
    CRAFT_BUILDING = 'CRAFT_BUILDING',
    SHOPS = 'SHOPS',
}

export interface IGetFilterParams {
    filterType?: FILTER_TYPE;
}

export interface ICategoryItem {
    uniquename: string;
    name: string;
    description: string;
}
