import { Test, TestingModule } from '@nestjs/testing';
import { CraftProfitListController } from './craft-profit-list.controller';
import { CraftProfitListService } from './craft-profit-list.service';

describe('CraftProfitListController', () => {
  let controller: CraftProfitListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CraftProfitListController],
      providers: [CraftProfitListService],
    }).compile();

    controller = module.get<CraftProfitListController>(CraftProfitListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
