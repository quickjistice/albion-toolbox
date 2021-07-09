export function buildingMapper(building) {
    const b = building;
    const items = b.craftingitemlist.craftitem;

    return {
        uniquename: b['@uniquename'],
        category: getCategory(b['@uniquename']),
        favoritedish: b.favoritedish ? b.favoritedish.dish['@item'] : null,
        items: mapItems(items),
    };
}

function mapItems(data) {
    const items = Array.isArray(data) ? data : [data];

    return items.map((itm) => ({
        uniquename: itm['@uniquename'],
    }));
}

function getCategory(name) {
    switch (name) {
        case 'T8_FORGE':
        case 'T8_HUNTERSLODGE':
        case 'T8_MAGICITEMS':
        case 'T8_SMELTER':
        case 'T8_TOOLMAKER':
            return 'CRAFT_ITEMS';
        case 'T8_CARPENTERSWORKSHOP':
        case 'T8_STONEMASONRY':
        case 'T8_TANNERY':
        case 'T8_WEAVINGMILL':
        case 'T8_BUTCHER':
            return 'CRAFT_RESOURCE';
        case 'T8_COOK':
        case 'T8_ALCHEMIST':
            return 'CRAFT_CONSUMABLES';
        default:
            return null;
    }
}
