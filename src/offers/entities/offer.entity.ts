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
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Offer UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Offer title',
    example: 'Web Development Service',
  })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({
    description: 'Offer description',
    example: 'Professional web development services',
  })
  @Column('text')
  description: string;

  @ApiProperty({ description: 'Offer price', example: 99.99 })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ description: 'Offer active status', example: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Offer status',
    enum: OfferStatus,
    example: OfferStatus.DRAFT,
  })
  @Column({ type: 'varchar', default: OfferStatus.DRAFT })
  status: OfferStatus;

  @ApiProperty({
    description: 'User UUID who created the offer',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column('uuid')
  userId: string;

  @ApiProperty({ type: () => UserEntity, description: 'Offer creator' })
  @ManyToOne(() => UserEntity, (user) => user.offers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @ApiProperty({
    description: 'Offer creation date',
    example: '2024-01-01T00:00:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Offer last update date',
    example: '2024-01-01T00:00:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    type: () => FavoriteEntity,
    isArray: true,
    description: 'Users who favorited this offer',
  })
  @OneToMany(() => FavoriteEntity, (favorite) => favorite.offer)
  followers: FavoriteEntity[];
}
