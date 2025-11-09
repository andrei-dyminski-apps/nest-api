import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { OfferEntity } from '../../offers/entities/offer.entity';
import { FavoriteEntity } from '../../favorites/entities/favorite.entity';

export enum UserRole {
  PERFORMER = 'performer',
  BRAND = 'brand',
  ADMIN = 'admin',
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  role: UserRole;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OfferEntity, (offer) => offer.user)
  offers: OfferEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
  favorites: FavoriteEntity[];
}
