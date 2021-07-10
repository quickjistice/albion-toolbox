import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { FiterQueryPipe } from 'server/pipes/filter-query-pipe';
import { IFilter } from 'src/@types/common';

import { CraftProfitListService } from './craft-profit-list.service';
import { CreateCraftProfitListDto } from './dto/create-craft-profit-list.dto';
import { UpdateCraftProfitListDto } from './dto/update-craft-profit-list.dto';

@Controller('craft-profit-list')
export class CraftProfitListController {
    constructor(
        private readonly craftProfitListService: CraftProfitListService,
    ) {}

    @Post()
    create(@Body() createCraftProfitListDto: CreateCraftProfitListDto) {
        return this.craftProfitListService.create(createCraftProfitListDto);
    }

    @Get()
    findAll(@Query(FiterQueryPipe) filter: IFilter) {
        return this.craftProfitListService.findAll(filter);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.craftProfitListService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCraftProfitListDto: UpdateCraftProfitListDto,
    ) {
        return this.craftProfitListService.update(
            +id,
            updateCraftProfitListDto,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.craftProfitListService.remove(+id);
    }
}
