import { Test, TestingModule } from '@nestjs/testing';
import { CommentsRepositoryyService } from './comments-repositoryy.service';

describe('CommentsRepositoryyService', () => {
  let service: CommentsRepositoryyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsRepositoryyService],
    }).compile();

    service = module.get<CommentsRepositoryyService>(
      CommentsRepositoryyService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
