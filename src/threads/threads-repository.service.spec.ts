import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { PaginationQueryDto } from 'src/shared/pagination-query-dto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateThreadDto } from './dto/create-thread-dto';
import { ThreadResponseDto } from './dto/thread-response-dto';
import { Thread } from './entities/thread.entity';
import { ThreadsService } from './threads.service';

const mockThreadsRepository = {
  findAndCount: vi.fn(),
  findOne: vi.fn(),
  save: vi.fn(),
  delete: vi.fn(),
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
    const threadId = 'c8926730-bca5-4de5-bb86-98791cdaae0c';
    const threadResponse = {
      id: threadId,
      title: 'How do I secure a NestJS API?',
      author: 'Alice',
      body: 'I am adding JWT auth and want to avoid common mistakes.',
      createdAt: '2026-06-08T10:30:00.000Z',
      comments: [],
    };

    mockThreadsRepository.findOne.mockResolvedValue(threadResponse);
    const result = await service.getThreadById(threadId);

    expect(mockThreadsRepository.findOne).toHaveBeenCalledWith({
      where: { id: threadId },
      relations: { comments: true },
    });
    expect(result.id).toBe(threadId);
    expect(result.title).toBe(threadResponse.title);
  });

  it('throws NotFoundException when thread not found by id', async () => {
    const threadId = 'non-existent-id';
    mockThreadsRepository.findOne.mockResolvedValue(null);

    await expect(service.getThreadById(threadId)).rejects.toThrow(
      `No thread with such id: ${threadId}`,
    );
  });

  it('creates a new thread', async () => {
    const threadPayload: CreateThreadDto = {
      title: 'New Thread',
      author: 'Alice',
      body: 'This is a new thread.',
    };

    const createdThread: ThreadResponseDto = {
      ...threadPayload,
      id: 'c8926730-bca5-4de5-bb86-98791cdaae0c',
      createdAt: new Date(),
      comments: [],
    };

    mockThreadsRepository.save.mockResolvedValue(createdThread);
    const result = await service.createNewThread(threadPayload);

    expect(mockThreadsRepository.save).toHaveBeenCalledWith(threadPayload);
    expect(result).toEqual(createdThread);
  });

  it('deletes a thread by id', async () => {
    const threadId = 'c8926730-bca5-4de5-bb86-98791cdaae0c';
    mockThreadsRepository.delete.mockResolvedValue({ affected: 1 });

    const res = await service.deleteThread(threadId);

    expect(mockThreadsRepository.delete).toHaveBeenCalledWith(threadId);
    expect(res).toBeUndefined();
  });
});
