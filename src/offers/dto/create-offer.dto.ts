import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsBoolean,
  IsOptional,
  IsUUID,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OfferStatus } from '../entities/offer.entity';

export class CreateOfferDto {
  @ApiProperty({
    description: 'Offer title',
    example: 'Web Development Service',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'Offer description',
    example: 'Professional web development services using modern technologies',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Offer status',
    enum: OfferStatus,
    example: OfferStatus.DRAFT,
  })
  @IsNotEmpty()
  @IsEnum(OfferStatus)
  status: OfferStatus;

  @ApiProperty({
    description: 'Offer price',
    example: 99.99,
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Offer active status',
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @ApiProperty({
    description: 'User UUID who created the offer',
    example: '63a7c6d8-adf6-4fdd-8455-24f6722a020d',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
