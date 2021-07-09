import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { parseBuildings, parseItems } from './parser/parser';

const binItems = JSON.parse(
    readFileSync(resolve(__dirname, 'ao-bin-data/items.json'), 'utf-8'),
);

const binBuildings = JSON.parse(
    readFileSync(resolve(__dirname, 'ao-bin-data/buildings.json'), 'utf-8'),
);

const items = convertItems(binItems);

writeFileSync(
    resolve(__dirname, 'ao-parsed-data/items.json'),
    JSON.stringify(items, null, 2),
);

const buildings = convertBuildings(binBuildings);

writeFileSync(
    resolve(__dirname, 'ao-parsed-data/buildings.json'),
    JSON.stringify(buildings, null, 2),
);

function convertItems(rawItems) {
    const categories = [
        'equipmentitem',
        'weapon',
        'consumableitem',
        'simpleitem',
    ];
    const result = [];

    //equipmentitem,weapon,consumableitem
    for (const cat of categories) {
        result.push(...parseItems(rawItems.items[cat]));
    }

    return result;
}

function convertBuildings(rawBuildings) {
    return parseBuildings(rawBuildings.buildings.craftbuilding);
}
