import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
    example: 1,
    description: 'Page number.',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @ApiPropertyOptional({
    enum: [1, 2, 3, 10, 20, 30, 50, 100],
    default: 10,
    example: 10,
    description: 'Items per page.',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @IsIn([1, 2, 3, 10, 20, 30, 50, 100], {
    message: 'limit must be one of: 10, 20, 30, 50, 100',
  })
  @Type(() => Number)
  limit: number = 10;
}
