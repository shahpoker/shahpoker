// FILE: shahpoker-backend/src/game/game.interfaces.ts
import { Card, Deck } from '../game-logic/src/'; // <<<< تغییر اصلی: index اضافه شد
import { User } from '../users/entities/user.entity';

export interface PlayerState {
  user: User;
  holeCards: Card[];
  stack: number;
  currentBet: number;
  hasActed: boolean;
  isAllIn: boolean;
  isFolded: boolean;
}

export interface GameState {
  tableId: string;
  deck: Deck;
  board: Card[];
  players: PlayerState[];
  pot: number;
  currentPlayerIndex: number;
  smallBlindIndex: number;
  bigBlindIndex: number;
}
