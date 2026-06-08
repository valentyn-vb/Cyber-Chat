import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import type { Request as ExpressReq } from 'express';
import { Public } from 'src/shared/decorators/public.decorator';
import { ResponseUserDto } from 'src/users/dto/response-user-dto';
import { AuthService } from './auth.service';
import {
  ApiLoginDocs,
  ApiRegisterDocs,
} from './decorators/auth-docs.decorator';
import { LoginDto } from './dto/login-dto';
import { RegisterDto } from './dto/register-dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiLoginDocs()
  private login(
    @Body() _loginDto: LoginDto,
    @Request() req: ExpressReq & { user: ResponseUserDto },
  ) {
    return this.authService.login(req.user);
  }
  @Public()
  @Post('register')
  @ApiRegisterDocs()
  private register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
