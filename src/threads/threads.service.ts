import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../shared/pagination-query-dto';
import { CreateThreadDto } from './dto/create-thread-dto';
import { ThreadResponseDto } from './dto/thread-response-dto';
import { UpdateThreadDto } from './dto/update-thread-dto';
import { Thread } from './entities/thread.entity';

@Injectable()
export class ThreadsService {
  constructor(@InjectRepository(Thread) private threads: Repository<Thread>) {}

  public async getAllThreads(pagination: PaginationQueryDto) {
    const { page, limit } = pagination;
    const [threads, totalItems] = await this.threads.findAndCount({
      relations: {
        comments: true,
      },
      order: {
        createdAt: 'ASC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    console.log(
      '🚀 ~ ThreadsService ~ getAllThreads ~ totalItems:',
      totalItems,
    );
    console.log('🚀 ~ ThreadsService ~ getAllThreads ~ threads:', threads);

    const responseThreads: ThreadResponseDto[] = plainToInstance(
      ThreadResponseDto,
      threads,
    );

    return {
      data: responseThreads,
      meta: {
        totalItems,
        itemCount: responseThreads.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  public async createNewThread(thread: CreateThreadDto) {
    const savedThread = await this.threads.save(thread);

    return plainToInstance(ThreadResponseDto, savedThread);
  }

  public async updateThread(id: string, thread: UpdateThreadDto) {
    const updatedThread = await this.threads.update(id, thread);

    if (!updatedThread) {
      throw new NotFoundException(`No thread with such id: ${id}`);
    }

    return this.getThreadById(id);
  }

  public async getThreadById(id: string) {
    const thread = await this.findThreadById(id);
    if (!thread) {
      throw new NotFoundException(`No thread with such id: ${id}`);
    }

    return plainToInstance(ThreadResponseDto, thread);
  }

  public async deleteThread(id: string) {
    const res = await this.threads.delete(id);
    if (!res.affected) {
      throw new NotFoundException(`No thread with such id: ${id}`);
    }
  }

  private async findThreadById(id: string) {
    return this.threads.findOne({
      where: { id },
      relations: { comments: true },
    });
  }
}
