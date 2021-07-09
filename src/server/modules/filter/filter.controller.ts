import { Controller, Get, Req } from '@nestjs/common';
import { FILTER_TYPE } from 'dist/server/modules/filter/utils/get-filter-types';
import { Request } from 'express';

import { IFilterDTO } from './dto/filter.dto';
import { FilterService } from './filter.service';

@Controller('filter')
export class FilterController {
    constructor(private readonly filterService: FilterService) {}

    @Get('/')
    async getFilter(@Req() req: Request): Promise<IFilterDTO> {
        const { m } = req.query;
        const filterType = m as FILTER_TYPE;

        return await this.filterService.getFilter({ filterType });
    }
}
