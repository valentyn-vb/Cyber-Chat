import { Thread } from 'src/threads/entities/thread.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Thread)
  @JoinColumn({ name: 'threadId' })
  thread!: Thread;

  @Column({ type: 'varchar', length: 200 })
  author!: string;

  @Column('text')
  body!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
