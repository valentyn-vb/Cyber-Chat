import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ThreadSummaryResponseDto } from '../../threads/dto/thread-summary-response-dto';

export class CommentResponseDto {
  @ApiProperty({
    format: 'uuid',
    example: '98927b70-01f3-42a0-a408-acbef6d54fd7',
  })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Bob' })
  @Expose()
  author: string;

  @ApiProperty({ example: 'This helped me understand the issue.' })
  @Expose()
  body: string;

  @ApiProperty({
    format: 'date-time',
    example: '2026-06-08T10:35:00.000Z',
  })
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({ type: ThreadSummaryResponseDto })
  @Expose()
  @Type(() => ThreadSummaryResponseDto)
  thread: ThreadSummaryResponseDto;
}
