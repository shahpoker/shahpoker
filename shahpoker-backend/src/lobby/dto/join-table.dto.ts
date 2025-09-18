import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class JoinTableDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  amount!: number;
}
