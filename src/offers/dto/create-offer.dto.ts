import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsBoolean,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
