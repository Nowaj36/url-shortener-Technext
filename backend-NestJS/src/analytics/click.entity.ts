import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Url } from '../urls/url-entity';

@Entity('clicks')
export class Click {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  ipAddress: string;

  @Column({ nullable: true })
  browser: string;

  @Column({ nullable: true })
  os: string;

  @Column({ nullable: true })
  device: string;

  @Column({ nullable: true })
  userAgent?: string;

  @Column({ nullable: true })
  referer?: string;

  @ManyToOne(() => Url, {
    onDelete: 'CASCADE',
  })
  url: Url;

  @Index()
  @CreateDateColumn()
  clickedAt: Date;
}
