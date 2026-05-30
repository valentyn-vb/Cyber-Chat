import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Comment } from './comments/entities/comment.entity';
import { Thread } from './threads/entities/thread.entity';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: '../db/chat.sqlite',
  entities: [Thread, Comment],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
