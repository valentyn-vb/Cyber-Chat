import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { Thread } from './threads/entities/thread.entity';
import { ThreadsModule } from './threads/threads.module';

@Module({
  imports: [
    ThreadsModule,
    CommentsModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: '../db/chat.sqlite',
      entities: [Thread],
      synchronize: true,
      logging: true,
      enableWAL: true,
      statementCacheSize: 100,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
