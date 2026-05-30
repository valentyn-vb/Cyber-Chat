import { Expose, Type } from 'class-transformer';
import { CommentResponseDto } from '../../comments/dto/comment-response-dto';

export class ThreadResponseDto {
  @Expose()
  title;

  @Expose()
  author;

  @Expose()
  body;

  @Expose()
  @Type(() => CommentResponseDto)
  comments: CommentResponseDto[];
}
