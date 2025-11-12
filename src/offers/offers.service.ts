import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OfferEntity } from './entities/offer.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly offerRepository: Repository<OfferEntity>,
    private readonly usersService: UsersService,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<OfferEntity> {
    const user = await this.usersService.findOne(createOfferDto.userId);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const offer = this.offerRepository.create(createOfferDto);
    return await this.offerRepository.save(offer);
  }

  async findAll(): Promise<OfferEntity[]> {
    return await this.offerRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<OfferEntity> {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!offer) {
      throw new NotFoundException('Offer not found!');
    }

    return offer;
  }

  async update(
    id: string,
    updateOfferDto: UpdateOfferDto,
  ): Promise<OfferEntity> {
    const offer = await this.findOne(id);
    Object.assign(offer, updateOfferDto);
    return await this.offerRepository.save(offer);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.offerRepository.delete(id);
  }
}
