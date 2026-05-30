import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-commnet-dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly comments: Repository<Comment>,
  ) {}

  public getAll() {
    return this.comments.find({
      order: {
        createdAt: 'ASC',
      },
    });
  }

  public async getById(id: string) {
    const comment = await this.comments.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException(`No comment with such id: ${id}`);
    }

    return comment;
  }

  public createNewComment(threadId: string, dto: CreateCommentDto) {
    console.log('🚀 ~ CommentsService ~ createNewComment ~ dto:', dto);
    console.log(
      '🚀 ~ CommentsService ~ createNewComment ~ threadId:',
      threadId,
    );
    const comment = this.comments.create({
      thread: { id: threadId },
      ...dto,
    });
    return this.comments.save(comment);
  }

  public async deleteById(id: string) {
    const res = await this.comments.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`No comment with such id: ${id}`);
    }
  }
}
