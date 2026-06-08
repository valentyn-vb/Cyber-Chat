import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiGetCommentDocs,
  ApiGetCommentsDocs,
} from './decorators/comments-docs.decorator';
import { CommentsService } from './comments.service';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('')
  @ApiGetCommentsDocs()
  getAllComments() {
    return this.commentsService.getAll();
  }

  @Get(':id')
  @ApiGetCommentDocs()
  getCommentById(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.getById(id);
  }
}
