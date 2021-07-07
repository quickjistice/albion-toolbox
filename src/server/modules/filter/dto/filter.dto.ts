interface IFIlterMainCategoryDTOITem {
    uniqname: string;
    name: string;
}

export interface IFilterDTO {
    selected: { mainCategory: string };
    mainCategory: IFIlterMainCategoryDTOITem[];
    tmp: any;
}
