import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @IsIn([1, 2, 3, 10, 20, 30, 50, 100], {
    message: 'limit must be one of: 10, 20, 30, 50, 100',
  })
  @Type(() => Number)
  limit: number = 10;
}
