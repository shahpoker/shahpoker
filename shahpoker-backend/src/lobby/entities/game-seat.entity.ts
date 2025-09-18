import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Table } from '../../tables/entities/table.entity';
import { Decimal } from 'decimal.js';

@Entity('game_seats')
export class GameSeat {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  user!: User;

  @ManyToOne(() => Table, (table) => table.id)
  table!: Table;

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 4,
    transformer: {
      to: (value: Decimal) => value.toString(),
      from: (value: string | null) => (value ? new Decimal(value) : null),
    },
  })
  stack!: Decimal | null;

  @Column({ name: 'seat_number' })
  seatNumber!: number;

  @CreateDateColumn({ name: 'sat_down_at' })
  satDownAt!: Date;
}
