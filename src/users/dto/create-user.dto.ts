import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsBoolean,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  lastName: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
