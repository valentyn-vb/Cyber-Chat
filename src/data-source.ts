import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Comment } from './comments/entities/comment.entity';
import { Thread } from './threads/entities/thread.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  database: '../db/chat.sqlite',
  entities: [Thread, Comment],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
