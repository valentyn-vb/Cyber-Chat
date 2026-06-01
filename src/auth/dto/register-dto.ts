import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  username!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8)
  password!: string;

  @IsEmail()
  email!: string;
}
