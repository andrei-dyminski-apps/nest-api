import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { OfferEntity } from '../../offers/entities/offer.entity';
import { FavoriteEntity } from '../../favorites/entities/favorite.entity';

export enum UserRole {
  PERFORMER = 'performer',
  BRAND = 'brand',
  ADMIN = 'admin',
}

@Entity('users')
export class UserEntity {
  @ApiProperty({ description: 'User UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'User role', enum: UserRole, example: UserRole.PERFORMER })
  @Column({ type: 'varchar' })
  role: UserRole;

  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ApiProperty({ description: 'User password (hashed)', example: 'hashedpassword' })
  @Column()
  password: string;

  @ApiProperty({ description: 'User first name', example: 'John' })
  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @ApiProperty({ description: 'User last name', example: 'Doe' })
  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @ApiProperty({ description: 'User active status', example: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'User creation date', example: '2024-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'User last update date', example: '2024-01-01T00:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ type: () => OfferEntity, isArray: true, description: 'User offers' })
  @OneToMany(() => OfferEntity, (offer) => offer.user)
  offers: OfferEntity[];

  @ApiProperty({ type: () => FavoriteEntity, isArray: true, description: 'User favorites' })
  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
  favorites: FavoriteEntity[];
}
