import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { Item } from 'server/entities/item.entity';
import { Building } from 'server/entities/building.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Building, Item])],
    controllers: [BuildingController],
    providers: [BuildingService],
    exports: [BuildingService],
})
export class BuildingModule {}
