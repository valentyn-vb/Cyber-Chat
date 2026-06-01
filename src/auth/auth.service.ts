import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from 'src/users/dto/response-user-dto';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register-dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  public async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { passwordHash: _, ...result } = user;
    return plainToInstance(ResponseUserDto, result);
  }

  public async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByUsername(
      registerDto.username,
    );
    if (existingUser) {
      throw new ConflictException('Username is already taken');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return plainToInstance(
      ResponseUserDto,
      await this.usersService.createUser(registerDto),
    );
  }
}
