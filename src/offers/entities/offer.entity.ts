import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { FavoriteEntity } from '../../favorites/entities/favorite.entity';

export enum OfferStatus {
  MODERATION = 'moderation',
  COMPLETED = 'completed',
  IN_WORK = 'in_work',
  ACTIVE = 'active',
  REJECTED = 'rejected',
  DRAFT = 'draft',
  ARCHIVE = 'archive',
  SUSPENDED = 'suspended',
}

@Entity('offers')
export class OfferEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'varchar', default: OfferStatus.DRAFT })
  status: OfferStatus;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.offers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.offer)
  followers: FavoriteEntity[];
}
