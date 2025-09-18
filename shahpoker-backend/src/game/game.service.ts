// FILE: shahpoker-backend/src/game/game.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { TablesService } from '../tables/tables.service';
import { GameState, PlayerState } from './game.interfaces';
import { Deck } from '../game-logic/src/'; // <<<< تغییر اصلی: index اضافه شد

@Injectable()
export class GameService {
  private activeGames = new Map<string, GameState>();

  constructor(private readonly tablesService: TablesService) {}

  async startGame(tableId: string): Promise<GameState> {
    if (this.activeGames.has(tableId)) {
      throw new BadRequestException(
        'Game is already in progress on this table.',
      );
    }

    const table = await this.tablesService.findOne(tableId);
    if (!table || table.seats.length < 2) {
      throw new BadRequestException('Not enough players to start the game.');
    }

    const deck = new Deck();
    deck.shuffle();

    const players: PlayerState[] = table.seats
      .filter((seat) => seat.stack !== null)
      .map((seat) => ({
        user: seat.user,
        stack: seat.stack!.toNumber(),
        holeCards: [deck.deal()!, deck.deal()!],
        currentBet: 0,
        hasActed: false,
        isAllIn: false,
        isFolded: false,
      }));

    if (players.length < 2) {
      throw new BadRequestException(
        'Not enough valid players to start the game.',
      );
    }

    const gameState: GameState = {
      tableId,
      deck,
      board: [],
      players,
      pot: 0,
      smallBlindIndex: 0,
      bigBlindIndex: 1 % players.length,
      currentPlayerIndex: 2 % players.length,
    };

    this.activeGames.set(tableId, gameState);

    console.log(`Game started on table ${tableId}`);
    return gameState;
  }
}
