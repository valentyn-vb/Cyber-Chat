import {
  IsEmail,
  IsNotEmpty,
  IsString,
  isValidationOptions,
  MinLength,
} from 'class-validator';
isValidationOptions;
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  username!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8)
  password!: string;
}
