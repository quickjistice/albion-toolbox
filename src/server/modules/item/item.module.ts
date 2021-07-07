import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
    CraftingEnchantment,
    CraftingResource,
    Item,
} from 'server/entities/item.entity';

import { ItemService } from './item.service';
import { ItemController } from './item.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Item, CraftingResource, CraftingEnchantment]),
    ],
    controllers: [ItemController],
    providers: [ItemService],
})
export class ItemModule {}
