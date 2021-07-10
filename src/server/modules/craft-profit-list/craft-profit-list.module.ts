import { Module } from '@nestjs/common';

import { CraftProfitListService } from './craft-profit-list.service';
import { CraftProfitListController } from './craft-profit-list.controller';
import { BuildingModule } from '../building/building.module';

@Module({
    imports: [BuildingModule],
    controllers: [CraftProfitListController],
    providers: [CraftProfitListService],
})
export class CraftProfitListModule {}
