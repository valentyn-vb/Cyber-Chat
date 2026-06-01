import { Exclude, Expose } from 'class-transformer';

export class ResponseUserDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
  @Expose()
  username: string;

  @Exclude()
  passwordHash: string;
}
