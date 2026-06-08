import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'alice', description: 'Account username.' })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  username!: string;

  @ApiProperty({
    minLength: 8,
    example: 'password123',
    description: 'Account password.',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8)
  password!: string;
}
