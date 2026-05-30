import { PartialType } from '@nestjs/mapped-types';
import { CreateThreadDto } from './create-thread-dto';

class UpdateThreadDto extends PartialType<CreateThreadDto> {}
