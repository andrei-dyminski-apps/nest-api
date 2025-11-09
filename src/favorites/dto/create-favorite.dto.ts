import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({
    description: 'User UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Offer UUID',
    example: '63a7c6d8-adf6-4fdd-8455-24f6722a020d',
  })
  @IsNotEmpty()
  @IsUUID()
  offerId: string;
}
