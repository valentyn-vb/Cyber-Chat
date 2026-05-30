import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(3)
  author: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}
