// FILE: shahpoker/apps/api/src/lobby/lobby.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameSeat } from './entities/game-seat.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { TablesService } from 'src/tables/tables.service';
import { Decimal } from 'decimal.js';
import { WebSocketService } from 'src/game/websocket.service';

@Injectable()
export class LobbyService {
  constructor(
    @InjectRepository(GameSeat)
    private readonly seatRepository: Repository<GameSeat>,
    private readonly tablesService: TablesService,
    private readonly webSocketService: WebSocketService,
  ) {}

  async joinTable(
    tableId: string,
    user: User,
    amount: number,
  ): Promise<GameSeat> {
    const table = await this.tablesService.findOne(tableId);
    if (!table) {
      throw new NotFoundException('Table not found');
    }
    if (table.seats.length >= table.size) {
      throw new BadRequestException('Table is full');
    }
    const alreadySeated = table.seats.some((seat) => seat.user.id === user.id);
    if (alreadySeated) {
      throw new BadRequestException('User is already seated at this table');
    }
    if (amount < table.minBuyIn || amount > table.maxBuyIn) {
      throw new BadRequestException(
        `Amount must be between ${table.minBuyIn} and ${table.maxBuyIn}`,
      );
    }
    const amountDecimal = new Decimal(amount);
    if (user.mainBalance.lessThan(amountDecimal)) {
      throw new BadRequestException('Insufficient balance');
    }
    const occupiedSeatNumbers = new Set(table.seats.map((s) => s.seatNumber));
    let seatNumber = -1;
    for (let i = 1; i <= table.size; i++) {
      if (!occupiedSeatNumbers.has(i)) {
        seatNumber = i;
        break;
      }
    }

    const newSeat = this.seatRepository.create({
      user,
      table,
      stack: amountDecimal,
      seatNumber,
    });

    const savedSeat = await this.seatRepository.save(newSeat);

    this.webSocketService.wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        // 1 means OPEN
        client.send(JSON.stringify({ event: 'playerJoined', data: savedSeat }));
      }
    });

    return savedSeat;
  }
}
