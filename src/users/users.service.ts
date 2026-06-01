import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register-dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  public findByUsername(username: string) {
    return this.users.findOneBy({ username });
  }

  public async createUser(userDto: RegisterDto) {
    const passwordHash = await bcrypt.hash(userDto.password, 10);
    return this.users.save({
      email: userDto.email,
      username: userDto.username,
      passwordHash,
    });
  }

  public validateUser(username: string, password: string) {}
}
