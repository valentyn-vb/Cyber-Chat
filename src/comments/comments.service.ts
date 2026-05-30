import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CommentResponseDto } from './dto/comment-response-dto';
import { CreateCommentDto } from './dto/create-commnet-dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly comments: Repository<Comment>,
  ) {}

  public async getAll() {
    const comments = await this.comments.find({
      order: {
        createdAt: 'ASC',
      },
      relations: {
        thread: true,
      },
    });

    return plainToInstance(CommentResponseDto, comments);
  }

  public async getById(id: string) {
    const comment = await this.comments.findOne({
      where: { id },
      relations: {
        thread: true,
      },
    });
    if (!comment) {
      throw new NotFoundException(`No comment with such id: ${id}`);
    }

    return plainToInstance(CommentResponseDto, comment);
  }

  public async createNewComment(threadId: string, dto: CreateCommentDto) {
    const comment = this.comments.create({
      thread: { id: threadId },
      ...dto,
    });
    const savedComment = await this.comments.save(comment);

    return this.getById(savedComment.id);
  }

  public async deleteById(id: string) {
    const res = await this.comments.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`No comment with such id: ${id}`);
    }
  }
}
