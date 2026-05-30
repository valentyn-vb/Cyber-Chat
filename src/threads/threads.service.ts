import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/comments/dto/create-commnet-dto';
import { Repository } from 'typeorm';
import { Thread } from './entities/thread.entity';
import { ThreadPayload } from './models/thread';

@Injectable()
export class ThreadsService {
  constructor(@InjectRepository(Thread) private threads: Repository<Thread>) {}

  public getAllThreads() {
    return this.threads.find({
      order: {
        createdAt: 'ASC',
      },
    });
  }

  public createNewThread(thread: ThreadPayload) {
    return this.threads.save(thread);
  }

  public async getThreadById(id: string) {
    const thread = await this.findThreadById(id);
    if (!thread) {
      throw new NotFoundException(`No thread with such id: ${id}`);
    }

    return thread;
  }

  public async deleteThread(id: string) {
    const res = await this.threads.delete(id);
    if (!res.affected) {
      throw new NotFoundException(`No thread with such id: ${id}`);
    }
    console.log('🚀 ~ ThreadsService ~ deleteThread ~ res:', res);
    return res.raw;
  }

  private async findThreadById(id: string) {
    return this.threads.findOneBy({ id });
  }
}
