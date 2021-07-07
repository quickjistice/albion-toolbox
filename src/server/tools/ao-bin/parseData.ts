import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

const categories = ['equipmentitem', 'weapon', 'consumableitem', 'simpleitem'];
const result = [];

const rawItemsData = readFileSync(
    resolve(__dirname, 'ao-bin-data/items.json'),
    'utf-8',
);
const rawItems = JSON.parse(rawItemsData);

//equipmentitem,weapon,consumableitem
for (const cat of categories) {
    rawItems.items[cat].forEach((item) => {
        if (checkCraftingItem(item)) {
            result.push(mapItem(item));
        }
    });
}

writeFileSync(
    resolve(__dirname, 'ao-parsed-data/items.json'),
    JSON.stringify(result, null, 2),
);

function mapItem(item) {
    return {
        uniquename: item['@uniquename'],
        tier: item['@tier'],
        categories: {
            shop: item['@shopcategory'],
            shopsub1: item['@shopsubcategory1'],
            crafting: item['@craftingcategory'],
        },
        resourcetype: item['@resourcetype'],
        craftingrequirements: mapCraftinRequirments(item.craftingrequirements),
        enchantments: mapEnchantments(item.enchantments),
    };
}

function mapCraftinRequirments(req) {
    if (!req) return null;
    if (Array.isArray(req)) return null;

    return {
        silver: req['@silver'],
        amountcrafted: req['@amountcrafted'],
        forcesinglecraft: req['@forcesinglecraft'],
        craftingfocus: req['@craftingfocus'],
        time: req['@time'],
        craftresource: mapCraftResource(req.craftresource),
    };
}

function mapCraftResource(res) {
    if (!res) return [];
    if (!Array.isArray(res)) res = [res];

    return res.map((d) => ({
        uniquename: d['@uniquename'],
        count: d['@count'],
    }));
}

function mapEnchantments(en) {
    if (!en) return null;
    const items = Array.isArray(en.enchantment)
        ? en.enchantment
        : [en.enchantment];

    return items.map(mapEnchantment);
}

function mapEnchantment(en) {
    return {
        enchantmentlevel: en['@enchantmentlevel'],
        craftingrequirements: mapCraftinRequirments(en.craftingrequirements),
    };
}

function checkCraftingItem(item) {
    if (!item.craftingrequirements) return false;
    if (item['@uniquename'].indexOf('QUESTITEM') === 1) return false;
    return true;
}
