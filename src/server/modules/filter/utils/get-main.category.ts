export enum MAIN_CATEGORY {
    CRAFT_BUILDING = 'CRAFT_BUILDING',
    SHOPS = 'SHOPS',
}

export const getMainCategory = function () {
    return [MAIN_CATEGORY.CRAFT_BUILDING, MAIN_CATEGORY.SHOPS];
};
