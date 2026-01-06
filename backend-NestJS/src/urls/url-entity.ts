import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('urls')
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalUrl: string;

  @Index({ unique: true })
  @Column({ length: 8 })
  shortCode: string;

  @Column({ default: 0 })
  clicks: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
