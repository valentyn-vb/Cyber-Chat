import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ maxLength: 20, example: 'Bob' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  author: string;

  @ApiProperty({ example: 'This helped me understand the issue.' })
  @IsString()
  @IsNotEmpty()
  body: string;
}
