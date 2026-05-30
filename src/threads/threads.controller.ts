import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentDto } from 'src/comments/dto/create-commnet-dto';
import { type ThreadPayload } from './models/thread';
import { ThreadsService } from './threads.service';

@Controller('threads')
export class ThreadsController {
  constructor(
    private threadsService: ThreadsService,
    private commentsService: CommentsService,
  ) {}

  @Get('')
  private getAllThreads() {
    return this.threadsService.getAllThreads();
  }

  @Get(':id')
  private getThreadById(@Param('id') id: string) {
    return this.threadsService.getThreadById(id);
  }

  @Post()
  private createThread(@Body() threadPayload: ThreadPayload) {
    console.log(
      '🚀 ~ ThreadsController ~ createThread ~ threadPayload:',
      threadPayload,
    );
    return this.threadsService.createNewThread(threadPayload);
  }

  @Post(':id/comments')
  createThreadComment(@Param('id') id: string, @Body() dto: CreateCommentDto) {
    console.log('🚀 ~ ThreadsController ~ createThreadComment ~ dto:', dto);
    return this.commentsService.createNewComment(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  private deleteThread(@Param('id') id: string) {
    return this.threadsService.deleteThread(id);
  }
}
