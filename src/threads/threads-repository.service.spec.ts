import { Test, TestingModule } from '@nestjs/testing';
import { ThreadsRepository } from './threads-repository.service';

describe('ThreadsRepository', () => {
  let service: ThreadsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreadsRepository],
    }).compile();

    service = module.get<ThreadsRepository>(ThreadsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
