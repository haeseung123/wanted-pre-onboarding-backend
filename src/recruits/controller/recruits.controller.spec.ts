import { Test, TestingModule } from '@nestjs/testing';
import { RecruitsController } from './recruits.controller';

describe('RecruitsController', () => {
  let controller: RecruitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecruitsController],
    }).compile();

    controller = module.get<RecruitsController>(RecruitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
