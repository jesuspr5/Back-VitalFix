import { Test, TestingModule } from '@nestjs/testing';
import { TypeserviceService } from './typeservice.service';


describe('TypeserviceService', () => {
  let service: TypeserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeserviceService],
    }).compile();

    service = module.get<TypeserviceService>(TypeserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
