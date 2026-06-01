import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { RegisterDto } from './dto/register-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  private login(@Body() loginDto: LoginDto) {
    console.log('🚀 ~ AuthController ~ login ~ loginDto:', loginDto);
    return this.authService.validateUser(loginDto.username, loginDto.password);
  }

  @Post('register')
  private register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
