import { Controller, Get } from '@nestjs/common';

import { IFilterDTO } from './dto/filter.dto';
import { FilterService } from './filter.service';

@Controller('filter')
export class FilterController {
    constructor(private readonly filterService: FilterService) {}

    @Get('/')
    getFilter(): IFilterDTO {
        return this.filterService.getFilter();
    }
}
