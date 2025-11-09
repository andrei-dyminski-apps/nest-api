import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/entities/user.entity';
import { OfferEntity } from '../../offers/entities/offer.entity';

@Entity('favorites')
@Index(['userId', 'offerId'], { unique: true })
export class FavoriteEntity {
  @ApiProperty({ description: 'Favorite UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'User UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @Column('uuid')
  userId: string;

  @ApiProperty({ description: 'Offer UUID', example: '123e4567-e89b-12d3-a456-426614174001' })
  @Column('uuid')
  offerId: string;

  @ApiProperty({ type: () => UserEntity, description: 'User who favorited' })
  @ManyToOne(() => UserEntity, (user) => user.favorites, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ApiProperty({ type: () => OfferEntity, description: 'Favorited offer' })
  @ManyToOne(() => OfferEntity, (offer) => offer.followers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'offer_id' })
  offer: OfferEntity;

  @ApiProperty({ description: 'Favorite creation date', example: '2024-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;
}
