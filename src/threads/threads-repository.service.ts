import { Injectable } from '@nestjs/common';
import { Thread } from './models/thread';

@Injectable()
export class ThreadsRepository {
  private threads: Map<string, Thread>;

  constructor() {
    this.threads = new Map<string, Thread>([
      [
        '1',

        {
          id: 1,
          title: 'How to learn NestJS effectively?',
          author: 'Oleksii',
          body: 'I recently started learning NestJS. Any good practices or resources you would recommend?',
          createdAt: new Date('2026-05-10T09:15:00'),
        },
      ],
      [
        '2',
        {
          id: 2,
          title: 'Best way to structure modules',
          author: 'Anna',
          body: 'Should feature modules contain their own services and repositories, or should they be shared?',
          createdAt: new Date('2026-05-12T14:40:00'),
        },
      ],
      [
        '3',
        {
          id: 3,
          title: 'TypeScript utility types are amazing',
          author: 'Max',
          body: 'Using Partial, Pick, and Omit made my DTOs much cleaner.',
          createdAt: new Date('2026-05-15T18:05:00'),
        },
      ],
      [
        '4',
        {
          id: 4,
          title: 'What database do you use with NestJS?',
          author: 'Sophia',
          body: 'Trying to decide between PostgreSQL and MongoDB for a new project.',
          createdAt: new Date('2026-05-18T11:20:00'),
        },
      ],
      [
        '5',
        {
          id: 5,
          title: 'Async/await error handling tips',
          author: 'Daniel',
          body: 'What is your preferred way to handle async errors in services and controllers?',
          createdAt: new Date('2026-05-20T16:55:00'),
        },
      ],
    ]);
  }
  public getAll() {
    return this.threads;
  }

  public getById(id: string) {
    return this.threads.get(id);
  }

  public create(thread: Thread) {
    this.threads.set(thread.id.toString(), thread);
    return thread.id;
  }
}
