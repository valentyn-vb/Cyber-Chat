import { Injectable, NotFoundException } from '@nestjs/common';
import { ThreadPayload } from './models/thread';
import { ThreadsRepository } from './threads-repository.service';

@Injectable()
export class ThreadsService {
  constructor(private threadsRepository: ThreadsRepository) {}

  public getAllThreads() {
    return this.threadsRepository.getAll();
  }

  public createNewThread(thread: ThreadPayload) {
    return this.threadsRepository.create({ id: Date.now(), ...thread });
  }

  public getThreadById(id: string) {
    const thread = this.threadsRepository.getById(id);
    if (!thread) {
      throw new NotFoundException(`No thread with such id: ${id}`);
    }

    return thread;
  }
}
