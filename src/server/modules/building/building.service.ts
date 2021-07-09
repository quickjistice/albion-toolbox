import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from 'server/entities/building.entity';
import { Repository } from 'typeorm';

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
        return await this.buildingRepository.findOne({ uniquename: id });
    }

    update(id: number, updateBuildingDto: UpdateBuildingDto) {
        return `This action updates a #${id} building`;
    }

    remove(id: number) {
        return `This action removes a #${id} building`;
    }

    async getByCategory(categoryId: string) {
        return await this.buildingRepository.find({ category: categoryId });
    }
}
