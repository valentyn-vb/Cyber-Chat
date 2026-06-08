import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateThreadDto {
  @ApiProperty({
    maxLength: 200,
    example: 'How do I secure a NestJS API?',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title!: string;

  @ApiProperty({ maxLength: 120, example: 'Alice' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  author!: string;

  @ApiProperty({
    maxLength: 5000,
    example: 'I am adding JWT auth and want to avoid common mistakes.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  body!: string;
}
