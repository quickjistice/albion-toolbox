import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'server/entities/item.entity';
import { Repository } from 'typeorm';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
    ) {}

    create(createItemDto: CreateItemDto) {
        return 'This action adds a new item';
    }

    async findAll() {
        return await this.itemRepository.find({ skip: 0, take: 100 });
    }

    async findOne(id: string) {
        return await this.itemRepository.findOne({ uniquename: id }, {});
    }

    update(id: number, updateItemDto: UpdateItemDto) {
        return `This action updates a #${id} item`;
    }

    remove(id: number) {
        return `This action removes a #${id} item`;
    }
}
