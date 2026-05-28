import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { type ThreadPayload } from './models/thread';
import { ThreadsService } from './threads.service';

@Controller('threads')
export class ThreadsController {
  constructor(private threadsService: ThreadsService) {}

  @Get('')
  private getAllThreads() {
    return Array.from(this.threadsService.getAllThreads().values());
  }

  @Get(':id')
    private getThreadById(@Param('id') id: string){
        this.threadsService.
    }

  @Post()
  private createThread(@Body() threadPayload: ThreadPayload) {
    return this.threadsService.createNewThread(threadPayload);
  }
}
