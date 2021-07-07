import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Building } from 'src/server/entities/building.entity';

@Injectable()
export class BuildingService {
    constructor(
        @InjectRepository(Building)
        private buildingsRepository: Repository<Building>,
    ) {}

    getAll() {
        this.buildingsRepository.find();
    }
}
