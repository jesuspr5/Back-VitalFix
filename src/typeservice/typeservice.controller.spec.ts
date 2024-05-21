import { Test, TestingModule } from '@nestjs/testing';
import { TypeserviceController } from './typeservice.controller';
import { TypeserviceService } from './typeservice.service';

describe('TypeserviceController', () => {
  let controller: TypeserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeserviceController],
      providers: [TypeserviceService],
    }).compile();

    controller = module.get<TypeserviceController>(TypeserviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
