import { Test, TestingModule } from '@nestjs/testing';
import { ThreadsRepositoryService } from './threads-repository.service';

describe('ThreadsRepositoryService', () => {
  let service: ThreadsRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreadsRepositoryService],
    }).compile();

    service = module.get<ThreadsRepositoryService>(ThreadsRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
