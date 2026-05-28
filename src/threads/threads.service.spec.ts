import { Test, TestingModule } from '@nestjs/testing';
import { ThreadsRepository } from './threads-repository.service';
import { ThreadsService } from './threads.service';

describe('ThreadsService', () => {
  let service: ThreadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreadsService, ThreadsRepository],
    }).compile();

    service = module.get<ThreadsService>(ThreadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
