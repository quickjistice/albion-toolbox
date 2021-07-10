import { parseBuildings } from '../parser/parser';

export function convertBuildings(rawBuildings) {
    return parseBuildings(rawBuildings.buildings.craftbuilding);
}
