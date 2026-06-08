import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { PaginationQueryDto } from 'src/shared/pagination-query-dto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Thread } from './entities/thread.entity';
import { ThreadsService } from './threads.service';

const mockThreadsRepository = {
  findAndCount: vi.fn(),
  findOne: vi.fn(),
};

describe('ThreadService', () => {
  let service: ThreadsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ThreadsService,
        {
          provide: getRepositoryToken(Thread),
          useValue: mockThreadsRepository,
        },
      ],
    }).compile();

    service = moduleRef.get<ThreadsService>(ThreadsService);
    vi.clearAllMocks();
  });

  it('Retrieve paginated threads', async () => {
    const threadResponse = {
      id: 'c8926730-bca5-4de5-bb86-98791cdaae0c',
      title: 'How do I secure a NestJS API?',
      author: 'Alice',
      body: 'I am adding JWT auth and want to avoid common mistakes.',
      createdAt: '2026-06-08T10:30:00.000Z',
      comments: [
        {
          id: '7d6b8c29-0f4d-4c6e-8e2d-4a1f7d9a1234',
          author: 'Bob',
          body: 'Use Passport JWT and store secrets in environment variables.',
          createdAt: '2026-06-08T11:00:00.000Z',
        },
        {
          id: '9a7f5e10-2d3b-4c8a-b7d9-8f1e2a3b4567',
          author: 'Charlie',
          body: 'Also consider refresh tokens and rate limiting.',
          createdAt: '2026-06-08T11:15:00.000Z',
        },
      ],
    };

    const page: PaginationQueryDto = { page: 1, limit: 10 };

    mockThreadsRepository.findAndCount.mockResolvedValue([[threadResponse], 1]);
    const result = await service.getAllThreads(page);

    expect(instanceToPlain(result.data, { exposeUnsetFields: false })).toEqual([
      {
        ...threadResponse,
        comments: threadResponse.comments.map((comment) => ({
          ...comment,
          createdAt: new Date(comment.createdAt),
        })),
      },
    ]);
    expect(result.meta.totalItems).toBe(1);
  });

  it('passes skip and take to findAndCount based on page and limit', async () => {
    const pagination: PaginationQueryDto = { page: 2, limit: 10 };

    mockThreadsRepository.findAndCount.mockResolvedValue([[], 0]);

    await service.getAllThreads(pagination);

    expect(mockThreadsRepository.findAndCount).toHaveBeenCalledWith({
      relations: { comments: true },
      order: { createdAt: 'ASC' },
      skip: 10,
      take: 10,
    });
  });

  it('retrieves thread by id', async () => {
    const threadResponse = {
      id: 'c8926730-bca5-4de5-bb86-98791cdaae0c',
      title: 'How do I secure a NestJS API?',
    };

    mockThreadsRepository.getThreadById.mockRejectedValue(threadResponse);
    const result = await service.getThreadById(
      'c8926730-bca5-4de5-bb86-98791cdaae0c',
    );

    expect(result.id).toBe(threadResponse.id);
  });
});
