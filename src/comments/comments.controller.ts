import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('')
  getAllComments() {
    return this.commentsService.getAll();
  }

  @Get(':id')
  getCommentById(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.getById(id);
  }
}
