import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { ThreadsModule } from './threads/threads.module';

@Module({
  imports: [ThreadsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
