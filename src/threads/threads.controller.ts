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
  Request,
  UseGuards,
} from '@nestjs/common';
import type { Request as ExpressReq } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCommentDto } from 'src/comments/dto/create-commnet-dto';
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

  @Get('')
  private getAllThreads(@Query() pagination: PaginationQueryDto) {
    return this.threadsService.getAllThreads(pagination);
  }

  @Get(':id')
  private getThreadById(@Param('id', ParseUUIDPipe) id: string) {
    return this.threadsService.getThreadById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  private createThread(
    @Body() threadPayload: CreateThreadDto,
    @Request() req: ExpressReq,
  ) {
    console.log('🚀 ~ ThreadsController ~ createThread ~ req:', req);
    return;
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
