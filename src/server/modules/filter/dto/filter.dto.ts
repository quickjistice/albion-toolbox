interface IFIlterCategoryDTOITem {
    uniquename: string;
    name: string;
    description: string;
}

export interface IFilterDTO {
    selected: { mainCategory: string };
    mainCategories: IFIlterCategoryDTOITem[];
    categories: IFIlterCategoryDTOITem[];
}
