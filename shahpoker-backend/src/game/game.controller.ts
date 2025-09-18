// FILE: shahpoker/apps/api/src/game/game.controller.ts
import {
  Controller,
  Post,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post(':tableId/start')
  @UseGuards(JwtAuthGuard)
  startGame(@Param('tableId', ParseUUIDPipe) tableId: string) {
    return this.gameService.startGame(tableId);
  }
}
