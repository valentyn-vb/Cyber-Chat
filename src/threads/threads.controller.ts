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
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from 'src/comments/dto/create-commnet-dto';
import { Public } from 'src/shared/decorators/public.decorator';
import { PaginationQueryDto } from 'src/shared/pagination-query-dto';
import { CommentsService } from '../comments/comments.service';
import {
  ApiCreateThreadCommentDocs,
  ApiCreateThreadDocs,
  ApiDeleteThreadDocs,
  ApiGetThreadDocs,
  ApiGetThreadsDocs,
  ApiUpdateThreadDocs,
} from './decorators/threads-docs.decorator';
import { CreateThreadDto } from './dto/create-thread-dto';
import { UpdateThreadDto } from './dto/update-thread-dto';
import { ThreadsService } from './threads.service';

@ApiTags('threads')
@Controller('threads')
export class ThreadsController {
  constructor(
    private threadsService: ThreadsService,
    private commentsService: CommentsService,
  ) {}

  @Public()
  @Get('')
  @ApiGetThreadsDocs()
  getAllThreads(@Query() pagination: PaginationQueryDto) {
    return this.threadsService.getAllThreads(pagination);
  }

  @Public()
  @Get(':id')
  @ApiGetThreadDocs()
  getThreadById(@Param('id', ParseUUIDPipe) id: string) {
    return this.threadsService.getThreadById(id);
  }

  @Post()
  @ApiCreateThreadDocs()
  createThread(@Body() threadPayload: CreateThreadDto) {
    return this.threadsService.createNewThread(threadPayload);
  }

  @Patch(':id')
  @ApiUpdateThreadDocs()
  updateThread(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() threadPayload: UpdateThreadDto,
  ) {
    return this.threadsService.updateThread(id, threadPayload);
  }

  @Post(':id/comments')
  @ApiCreateThreadCommentDocs()
  createThreadComment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.createNewComment(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteThreadDocs()
  deleteThread(@Param('id', ParseUUIDPipe) id: string) {
    return this.threadsService.deleteThread(id);
  }
}
