import { Test, TestingModule } from '@nestjs/testing';
import { CraftProfitListService } from './craft-profit-list.service';

describe('CraftProfitListService', () => {
  let service: CraftProfitListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CraftProfitListService],
    }).compile();

    service = module.get<CraftProfitListService>(CraftProfitListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
