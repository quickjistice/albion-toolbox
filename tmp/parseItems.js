const fs = require('fs');

const rawItems = JSON.parse(fs.readFileSync('./items.json', 'utf-8'));
const result = [];
//

rawItems.items.consumableitem.forEach((item) => {
    if (!item.craftingrequirements) return;
    result.push(mapItem(item));
});

fs.writeFileSync('./db-items.json', JSON.stringify(result, null, 2));

function mapItem(item) {
    return {
        uniqname: item['@uniquename'],
        descriptionlocatag: item['@descriptionlocatag'],
        uisprite: item['@uisprite'],
        shopcategory: item['@shopcategory'],
        shopsubcategory1: item['@shopsubcategory1'],
        craftingcategory: item['@craftingcategory'],
        tier: item['@tier'],
        craftingrequirements: mapCraftinRequirments(item.craftingrequirements),
        enchantments: item.enchantments
            ? {
                  enchantment: mapEnchantment(item.enchantments.enchantment),
              }
            : undefined,
    };
}

function mapCraftinRequirments(req) {
    if (!req) return undefined;

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

function mapEnchantment(en) {
    return {
        enchantmentlevel: en['@enchantmentlevel'],
        craftingrequirements: mapCraftinRequirments(en.craftingrequirements),
    };
}
