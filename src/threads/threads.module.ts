import { Module } from '@nestjs/common';
import { ThreadsRepository } from './threads-repository.service';
import { ThreadsController } from './threads.controller';
import { ThreadsService } from './threads.service';

@Module({
  controllers: [ThreadsController],
  providers: [ThreadsService, ThreadsRepository],
})
export class ThreadsModule {}
