import { Comment } from 'src/comments/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('threads')
export class Thread {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  title!: string;

  @OneToMany(() => Comment, (comment) => comment.thread)
  comments!: Comment[];

  @Column({ type: 'varchar', length: 120 })
  author!: string;

  @Column('text')
  body!: string;

  @Column('text')
  notNeedField!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
