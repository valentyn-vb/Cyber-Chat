import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'alice', description: 'Unique username.' })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  username!: string;

  @ApiProperty({
    minLength: 8,
    example: 'password123',
    description: 'Password used for login.',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({
    format: 'email',
    example: 'alice@example.com',
    description: 'Unique email address.',
  })
  @IsEmail()
  email!: string;
}
