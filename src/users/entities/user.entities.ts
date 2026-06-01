import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: '20', unique: true })
  username!: string;

  @Column({ type: 'varchar', length: '120', unique: true })
  email!: string;

  @Column()
  passwordHash!: string;
  @CreateDateColumn()
  createdAt!: Date;
}
