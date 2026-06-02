import { Exclude, Expose } from 'class-transformer';

export class ResponseUserDto {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  username: string;

  @Exclude()
  passwordHash: string;
}
