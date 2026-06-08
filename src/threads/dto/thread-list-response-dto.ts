import { ApiProperty } from '@nestjs/swagger';
import { ThreadResponseDto } from './thread-response-dto';

class PaginationMetaDto {
  @ApiProperty({ example: 42 })
  totalItems: number;

  @ApiProperty({ example: 10 })
  itemCount: number;

  @ApiProperty({ example: 10 })
  itemsPerPage: number;

  @ApiProperty({ example: 5 })
  totalPages: number;

  @ApiProperty({ example: 1 })
  currentPage: number;
}

export class ThreadListResponseDto {
  @ApiProperty({ type: [ThreadResponseDto] })
  data: ThreadResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
