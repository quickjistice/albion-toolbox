export function mapItem(item) {
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