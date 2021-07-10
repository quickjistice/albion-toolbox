export type FilterType = 'FILTER_TYPE_CRAFT_BUILDING' | 'FILTER_TYPE_SHOPS';

export interface IFilterQuery {
    type?: FilterType;
    category?: string;
    subcategory?: string;
}

export interface IFilter {
    filterType?: FilterType;
    category?: string;
    subcategory?: string;
}
