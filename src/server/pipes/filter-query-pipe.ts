import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';

import { FILTER_TYPES } from 'server/constants/filter-type';
import { IFilter, IFilterQuery } from 'src/@types/common';

@Injectable()
export class FiterQueryPipe implements PipeTransform<IFilterQuery, IFilter> {
    transform(
        { type, category, subcategory }: IFilterQuery,
        _metadata: ArgumentMetadata,
    ) {
        if (type) {
            if (FILTER_TYPES.indexOf(type) === -1) {
                throw new BadRequestException(
                    `Filter Type (t) must be one of ${FILTER_TYPES.join()}`,
                );
            }
        }

        const filter = {
            filterType: type,
            category,
            subcategory,
        };

        return filter;
    }
}
