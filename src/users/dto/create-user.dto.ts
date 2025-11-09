import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsBoolean,
  IsOptional,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  lastName: string;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    example: UserRole.PERFORMER,
  })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    description: 'User active status',
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
