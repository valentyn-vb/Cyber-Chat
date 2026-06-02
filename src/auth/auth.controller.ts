import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request as ExpressReq } from 'express';
import { ResponseUserDto } from 'src/users/dto/response-user-dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { RegisterDto } from './dto/register-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  private login(
    @Body() _loginDto: LoginDto,
    @Request() req: ExpressReq & { user: ResponseUserDto },
  ) {
    return this.authService.login(req.user);
  }

  @Post('register')
  private register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
