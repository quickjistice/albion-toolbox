import { parseItems } from '../parser/parser';

export function convertItems(rawItems) {
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
