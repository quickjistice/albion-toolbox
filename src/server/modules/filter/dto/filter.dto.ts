interface IFIlterCategoryITemDTO {
    uniquename: string;
    name: string;
    description: string;
}

export interface IFilterDTO {
    filterType: {
        items: IFIlterCategoryITemDTO[];
        value: IFIlterCategoryITemDTO;
    };
    categories: {
        items: IFIlterCategoryITemDTO[];
        value: IFIlterCategoryITemDTO;
    };
    subcategories: {
        items: IFIlterCategoryITemDTO[];
        value: IFIlterCategoryITemDTO;
    };
}
