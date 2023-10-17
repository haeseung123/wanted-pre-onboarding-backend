import { Test, TestingModule } from '@nestjs/testing';
import { RecruitsService } from './recruits.service';

describe('RecruitsService', () => {
  let service: RecruitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecruitsService],
    }).compile();

    service = module.get<RecruitsService>(RecruitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
