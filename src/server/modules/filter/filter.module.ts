import { Module } from '@nestjs/common';
import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';

import { BuildingsModule } from 'src/server/providers/building/buildings.module';

@Module({
    imports: [BuildingsModule],
    controllers: [FilterController],
    providers: [FilterService],
})
export class FilterModule {}
