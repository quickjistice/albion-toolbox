import { buildingMapper } from './mappers/building';
import { mapItem } from './mappers/item';

export const parseItems = (items) => {
    return items.filter(checkCraftingItem).map(mapItem);
};

export const parseBuildings = (buildings) => {
    return buildings.filter(buildingFilter).map(buildingMapper);
};

function checkCraftingItem(item) {
    if (!item.craftingrequirements) return false;
    if (item['@uniquename'].indexOf('QUESTITEM') !== -1) return false;
    if (item['@uniquename'].indexOf('PROTOTYPE') !== -1) return false;
    if (item['@uniquename'].indexOf('PERFTEST') !== -1) return false;
    return true;
}

function buildingFilter(building) {
    if (building['@uniquename'].indexOf('TUTORIAL') !== -1) return false;
    if (building['@tier'] !== '8') return false;
    if (!building.favoritedish) return false;

    return true;
}
