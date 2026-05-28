import { Test, TestingModule } from '@nestjs/testing';
import { ThreadsRepository } from './threads-repository.service';
import { ThreadsController } from './threads.controller';
import { ThreadsService } from './threads.service';

describe('ThreadsController', () => {
  let controller: ThreadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThreadsController],
      providers: [ThreadsService, ThreadsRepository],
    }).compile();

    controller = module.get<ThreadsController>(ThreadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
