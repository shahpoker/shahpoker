import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { GameType, TableSize } from '../entities/table.entity';

export class CreateTableDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsEnum(GameType)
  @IsNotEmpty()
  gameType!: GameType;

  @IsEnum(TableSize)
  @IsNotEmpty()
  size!: TableSize;

  @IsNumber()
  @Min(0.01)
  smallBlind!: number;

  @IsNumber()
  @Min(0.02)
  bigBlind!: number;

  @IsNumber()
  @Min(1)
  minBuyIn!: number;

  @IsNumber()
  @Min(1)
  maxBuyIn!: number;

  @IsNumber()
  @Min(5)
  actionTime!: number;
}
