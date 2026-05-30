import { Expose, Type } from 'class-transformer';
import { ThreadSummaryResponseDto } from '../../threads/dto/thread-summary-response-dto';

export class CommentResponseDto {
  @Expose()
  id: string;

  @Expose()
  author: string;

  @Expose()
  body: string;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => ThreadSummaryResponseDto)
  thread: ThreadSummaryResponseDto;
}
