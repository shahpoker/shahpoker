import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  telegramId!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nickname!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName!: string;

  @IsUrl()
  @IsOptional()
  avatarUrl?: string;
}
