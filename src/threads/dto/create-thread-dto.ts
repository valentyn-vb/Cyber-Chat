import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateThreadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title!: string;

  @sString()
  @IsNotEmpty()
  @MaxLength(120)
  author!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  body!: string;
}
