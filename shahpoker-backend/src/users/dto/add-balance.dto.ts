import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddBalanceDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  amount!: number;
}
