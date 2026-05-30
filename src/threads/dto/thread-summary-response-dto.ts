import { Expose } from 'class-transformer';

export class ThreadSummaryResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  author: string;

  @Expose()
  body: string;

  @Expose()
  createdAt: Date;
}
