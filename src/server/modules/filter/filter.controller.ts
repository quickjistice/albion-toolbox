import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { FilterType } from 'src/@types/common';

import { IFilterDTO } from './dto/filter.dto';
import { FilterService } from './filter.service';

@Controller('filter')
export class FilterController {
    constructor(private readonly filterService: FilterService) {}

    @Get('/')
    async getFilter(@Req() req: Request): Promise<IFilterDTO> {
        const { m } = req.query;
        const filterType = m as FilterType;

        return await this.filterService.getFilter({ filterType });
    }
}
