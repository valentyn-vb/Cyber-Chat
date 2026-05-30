import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from 'src/comments/comments.module';
import { Comment } from 'src/comments/entities/comment.entity';
import { Thread } from './entities/thread.entity';
import { ThreadsController } from './threads.controller';
import { ThreadsService } from './threads.service';

@Module({
  imports: [
    CommentsModule,
    TypeOrmModule.forFeature([Thread]),
    TypeOrmModule.forFeature([Comment]),
  ],
  controllers: [ThreadsController],
  providers: [ThreadsService],
})
export class ThreadsModule {}
