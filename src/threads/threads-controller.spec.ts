import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Server } from 'http';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { CommentsService } from '../comments/comments.service';
import { Thread } from './entities/thread.entity';
import { ThreadsController } from './threads.controller';
import { ThreadsService } from './threads.service';

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

const mockThreadsRepository = {
  findAndCount: vi.fn(),
  findOne: vi.fn(),
  save: vi.fn(),
  delete: vi.fn(),
};

const mockCommentsService = {
  createNewComment: vi.fn(),
};

type ThreadsListResponse = {
  data: typeof threadResponse[];
  meta: {
    totalItems: number;
  };
};

describe('Thread controller (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [ThreadsController],
      providers: [
        ThreadsService,
        {
          provide: CommentsService,
          useValue: mockCommentsService,
        },
        {
          provide: getRepositoryToken(Thread),
          useValue: mockThreadsRepository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /threads retrieves an array of threads successfully', async () => {
    mockThreadsRepository.findAndCount.mockResolvedValue([[threadResponse], 1]);

    const response = await request(app.getHttpServer() as Server)
      .get('/threads')
      .expect(200);

    const body = response.body as ThreadsListResponse;
    expect(body.data).toHaveLength(1);
    expect(body.meta.totalItems).toBe(1);
  });
});
