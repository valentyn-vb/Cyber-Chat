import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from 'src/users/dto/response-user-dto';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register-dto';
import { JwtPayload } from './types/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  public async validateUser(
    username: string,
    password: string,
  ): Promise<ResponseUserDto | null> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return plainToInstance(ResponseUserDto, user);
  }

  public login(user: ResponseUserDto) {
    const payload: JwtPayload = {
      username: user.username,
      sub: user.id,
      roles: [],
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByUsername(
      registerDto.username,
    );
    if (existingUser) {
      throw new ConflictException('Username is already taken');
    }

    return plainToInstance(
      ResponseUserDto,
      await this.usersService.createUser(registerDto),
    );
  }
}
