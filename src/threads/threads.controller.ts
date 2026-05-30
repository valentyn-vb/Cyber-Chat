import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsService } from '../comments/comments.service';
import { CreateCommentDto } from '../comments/dto/create-commnet-dto';
import { CreateThreadDto } from './dto/create-thread-dto';
import { UpdateThreadDto } from './dto/update-thread-dto';
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
  private createThread(@Body() threadPayload: CreateThreadDto) {
    return this.threadsService.createNewThread(threadPayload);
  }

  @Patch(':id')
  private updateThread(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() threadPayload: UpdateThreadDto,
  ) {
    return this.threadsService.updateThread(id, threadPayload);
  }

  @Post(':id/comments')
  createThreadComment(@Param('id') id: string, @Body() dto: CreateCommentDto) {
    return this.commentsService.createNewComment(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  private deleteThread(@Param('id') id: string) {
    return this.threadsService.deleteThread(id);
  }
}
