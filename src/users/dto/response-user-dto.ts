import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class ResponseUserDto {
  @ApiProperty({
    format: 'uuid',
    example: '6fd69aa8-d571-45d9-b3ef-3264c6972844',
  })
  @Expose()
  id: string;

  @ApiProperty({ format: 'email', example: 'alice@example.com' })
  @Expose()
  email: string;

  @ApiProperty({ example: 'alice' })
  @Expose()
  username: string;

  @Exclude()
  passwordHash: string;
}
