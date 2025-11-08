import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoriteEntity } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favoritesRepository: Repository<FavoriteEntity>,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto): Promise<FavoriteEntity> {
    const { userId, offerId } = createFavoriteDto;
    const favorite = this.favoritesRepository.create({ userId, offerId });
    return await this.favoritesRepository.save(favorite);
  }

  async findAll({
    userId,
    offerId,
  }: Partial<FavoriteEntity>): Promise<FavoriteEntity[]> {
    const where: Partial<FavoriteEntity> = {};
    const relations: string[] = [];

    if (userId) {
      where.userId = userId;
      relations.push('offer');
    }

    if (offerId) {
      where.offerId = offerId;
      relations.push('user');
    }

    if (!userId && !offerId) {
      relations.push('user', 'offer');
    }

    return await this.favoritesRepository.find({
      where: Object.keys(where).length > 0 ? where : undefined,
      relations,
    });
  }

  async remove(id: string): Promise<void> {
    const result = await this.favoritesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }
  }
}
