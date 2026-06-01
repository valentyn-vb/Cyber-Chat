import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './entities/user.entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  public findByUsername(username: string) {
    return this.users.findOneBy({ username });
  }

  public async createUser(userDto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(userDto.password, 10);
    return this.users.save({
      email: userDto.email,
      username: userDto.username,
      passwordHash,
    });
  }
}
