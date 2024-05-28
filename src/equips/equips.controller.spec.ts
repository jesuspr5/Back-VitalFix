import { Test, TestingModule } from '@nestjs/testing';
import { EquipsController } from './equips.controller';
import { EquipsService } from './equips.service';


describe('EquipsController', () => {
  let controller: EquipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipsController],
      providers: [EquipsService],
    }).compile();

    controller = module.get<EquipsController>(EquipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
