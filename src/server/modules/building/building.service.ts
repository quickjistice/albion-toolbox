import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from 'server/entities/building.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingService {
    constructor(
        @InjectRepository(Building)
        private buildingRepository: Repository<Building>,
    ) {}

    create(createBuildingDto: CreateBuildingDto) {
        return 'This action adds a new building';
    }

    async findAll() {
        return await this.buildingRepository.find({});
    }

    async findOne(id: string) {
        return await this.buildingRepository
            .createQueryBuilder('building')
            .leftJoinAndSelect('building.items', 'item')
            .where('building.uniquename = :name', {
                name: id,
            })
            // .andWhere('item.categoriesCrafting = :cat', {
            //     cat: 'offhand',
            // })
            .getOne();

        // return await this.buildingRepository.findOne({
        //     where: (qb: SelectQueryBuilder<Building>) => {
        //         qb.where('Building.uniquename = :id', {
        //             id,
        //         }).andWhere('items.categoriesCrafting = :cat', {
        //             cat: 'offhand',
        //         });
        //     },
        //     relations: ['items'],
        // });
    }

    update(id: number, updateBuildingDto: UpdateBuildingDto) {
        return `This action updates a #${id} building`;
    }

    remove(id: number) {
        return `This action removes a #${id} building`;
    }

    async findByCategory(categoryId: string) {
        return await this.buildingRepository.find({
            select: ['uniquename'],
            where: { category: categoryId },
        });
    }
}
