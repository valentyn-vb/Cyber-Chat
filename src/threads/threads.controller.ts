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
  Query,
} from '@nestjs/common';
import { CreateCommentDto } from 'src/comments/dto/create-commnet-dto';
import { Public } from 'src/shared/decorators/public.decorator';
import { PaginationQueryDto } from 'src/shared/pagination-query-dto';
import { CommentsService } from '../comments/comments.service';
import { CreateThreadDto } from './dto/create-thread-dto';
import { UpdateThreadDto } from './dto/update-thread-dto';
import { ThreadsService } from './threads.service';

@Controller('threads')
export class ThreadsController {
  constructor(
    private threadsService: ThreadsService,
    private commentsService: CommentsService,
  ) {}

  @Public()
  @Get('')
  private getAllThreads(@Query() pagination: PaginationQueryDto) {
    return this.threadsService.getAllThreads(pagination);
  }

  @Public()
  @Get(':id')
  private getThreadById(@Param('id', ParseUUIDPipe) id: string) {
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
  createThreadComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.createNewComment(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  private deleteThread(@Param('id', ParseUUIDPipe) id: string) {
    return this.threadsService.deleteThread(id);
  }
}
