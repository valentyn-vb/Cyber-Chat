import { Test, TestingModule } from '@nestjs/testing';
import { CommentsRepository } from './comments-repositoryy.service';

describe('CommentsRepository', () => {
  let service: CommentsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsRepository],
    }).compile();

    service = module.get<CommentsRepository>(CommentsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
