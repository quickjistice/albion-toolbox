import { Module } from '@nestjs/common';

import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';
import { BuildingModule } from '../building/building.module';

@Module({
    imports: [BuildingModule],
    controllers: [FilterController],
    providers: [FilterService],
})
export class FilterModule {}
