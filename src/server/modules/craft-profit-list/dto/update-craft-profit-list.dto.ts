import { PartialType } from '@nestjs/mapped-types';
import { CreateCraftProfitListDto } from './create-craft-profit-list.dto';

export class UpdateCraftProfitListDto extends PartialType(CreateCraftProfitListDto) {}
