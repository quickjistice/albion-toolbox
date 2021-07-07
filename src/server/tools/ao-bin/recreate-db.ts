import { createConnection } from 'typeorm';

import { Item } from '../../entities/item.entity';
import { Building } from '../../entities/building.entity';

import * as items from './ao-parsed-data/items.json';

async function run() {
    const connection = await createConnection();

    // remove previous data
    // await connection.getRepository(Item).clear();
    await connection
        .createQueryBuilder()
        .delete()
        .from(Item)
        // .where('id = :id', { id: 1 })
        .execute();
    await connection.getRepository(Building).delete({});

    // add new data
    const res = [];
    const itemRepo = connection.getRepository(Item);
    for (const item of items) {
        const entity = itemRepo.create({
            uniquename: item.uniquename,
            tier: parseInt(item.tier),
            categories: item.categories,
            requirements: item.craftingrequirements
                ? {
                      silver: item.craftingrequirements.silver,
                      amountcrafted: item.craftingrequirements.amountcrafted,
                      forcesinglecraft:
                          item.craftingrequirements.forcesinglecraft,
                      craftingfocus: item.craftingrequirements.craftingfocus,
                      time: item.craftingrequirements.time,
                  }
                : null,
            resources: item.craftingrequirements
                ? item.craftingrequirements.craftresource.map((res) => ({
                      resource: res.uniquename,
                      ...res,
                  }))
                : [],
            enchantments: item.enchantments
                ? item.enchantments.map((enc) => ({
                      uniquename: `ENCHANT_${item.uniquename}_${enc.enchantmentlevel}`,
                      level: enc.enchantmentlevel,
                      requirements: enc.craftingrequirements
                          ? {
                                silver: enc.craftingrequirements.silver,
                                amountcrafted:
                                    enc.craftingrequirements.amountcrafted,
                                forcesinglecraft:
                                    enc.craftingrequirements.forcesinglecraft,
                                craftingfocus:
                                    enc.craftingrequirements.craftingfocus,
                                time: enc.craftingrequirements.time,
                            }
                          : null,
                      resources: enc.craftingrequirements
                          ? enc.craftingrequirements.craftresource.map(
                                (res) => ({
                                    resource: res.uniquename,
                                    ...res,
                                }),
                            )
                          : [],
                  }))
                : [],
        });
        console.log(entity.uniquename);
        res.push(entity);
    }
    await itemRepo.save(res);
}

run();
