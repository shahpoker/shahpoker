import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Decimal } from 'decimal.js';

export enum UserRole {
  PLAYER = 'player',
  AGENT = 'agent',
  MANAGER = 'manager',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'bigint', unique: true })
  @Index()
  telegramId!: number;

  @Column({ length: 100 })
  nickname!: string;

  @Column({ length: 100, name: 'first_name' })
  firstName!: string;

  @Column({ type: 'text', nullable: true })
  avatarUrl?: string;

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 4,
    default: 0,
    transformer: {
      to: (value: Decimal) => value.toString(),
      from: (value: string | null) =>
        value ? new Decimal(value) : new Decimal(0),
    },
  })
  mainBalance: Decimal = new Decimal(0);

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 4,
    default: 0,
    name: 'cash_balance',
    transformer: {
      to: (value: Decimal) => value.toString(),
      from: (value: string | null) =>
        value ? new Decimal(value) : new Decimal(0),
    },
  })
  cashBalance: Decimal = new Decimal(0);

  @Column({
    type: 'decimal',
    precision: 19,
    scale: 4,
    default: 0,
    name: 'tournament_balance',
    transformer: {
      to: (value: Decimal) => value.toString(),
      from: (value: string | null) =>
        value ? new Decimal(value) : new Decimal(0),
    },
  })
  tournamentBalance: Decimal = new Decimal(0);

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PLAYER,
  })
  role!: UserRole;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  isChatRestricted!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'last_login_at' })
  lastLoginAt?: Date;
}
