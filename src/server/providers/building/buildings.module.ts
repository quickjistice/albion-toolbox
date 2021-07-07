import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Building } from 'src/server/entities/building.entity';
import { CraftingResource, Item } from 'src/server/entities/item.entity';

import { BuildingService } from './building.service';

@Module({
    imports: [TypeOrmModule.forFeature([Building, CraftingResource, Item])],
    controllers: [],
    providers: [BuildingService],
    exports: [BuildingService],
})
export class BuildingsModule {}
