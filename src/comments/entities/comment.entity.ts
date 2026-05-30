import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Thread } from '../../threads/entities/thread.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Thread, (thread) => thread.comments)
  @JoinColumn({ name: 'threadId' })
  thread!: Thread;

  @Column({ type: 'varchar', length: 200 })
  author!: string;

  @Column('text')
  body!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
