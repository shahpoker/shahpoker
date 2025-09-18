import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GameSeat } from '../../lobby/entities/game-seat.entity';

export enum GameType {
  HOLDEM = 'holdem',
  OMAHA = 'omaha',
  OMAHA_5 = 'omaha_5',
  OMAHA_6 = 'omaha_6',
}

export enum TableSize {
  HEADS_UP = 2,
  FOUR_MAX = 4,
  SIX_MAX = 6,
  EIGHT_MAX = 8,
}

@Entity('tables')
export class Table {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ type: 'enum', enum: GameType })
  gameType!: GameType;

  @Column({ type: 'enum', enum: TableSize })
  size!: TableSize;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'small_blind' })
  smallBlind!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'big_blind' })
  bigBlind!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'min_buy_in' })
  minBuyIn!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, name: 'max_buy_in' })
  maxBuyIn!: number;

  @Column({ type: 'int', name: 'action_time_seconds' })
  actionTime!: number;

  @OneToMany(() => GameSeat, (seat) => seat.table, { eager: true })
  seats!: GameSeat[];
}
