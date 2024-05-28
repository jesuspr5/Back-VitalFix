import { Test, TestingModule } from '@nestjs/testing';
import { EquipsService } from './equips.service';

describe('EquipsService', () => {
  let service: EquipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipsService],
    }).compile();

    service = module.get<EquipsService>(EquipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
