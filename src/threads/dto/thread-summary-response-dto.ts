import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ThreadSummaryResponseDto {
  @ApiProperty({
    format: 'uuid',
    example: 'c8926730-bca5-4de5-bb86-98791cdaae0c',
  })
  @Expose()
  id: string;

  @ApiProperty({ example: 'How do I secure a NestJS API?' })
  @Expose()
  title: string;

  @ApiProperty({ example: 'Alice' })
  @Expose()
  author: string;

  @ApiProperty({
    example: 'I am adding JWT auth and want to avoid common mistakes.',
  })
  @Expose()
  body: string;

  @ApiProperty({
    format: 'date-time',
    example: '2026-06-08T10:30:00.000Z',
  })
  @Expose()
  createdAt: Date;
}
