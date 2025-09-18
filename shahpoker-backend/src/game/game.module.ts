// FILE: shahpoker/apps/api/src/game/game.module.ts
import { Module } from '@nestjs/common';
import { WebSocketService } from './websocket.service';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TablesModule } from 'src/tables/tables.module';

@Module({
  imports: [TablesModule],
  providers: [WebSocketService, GameService],
  exports: [WebSocketService],
  controllers: [GameController],
})
export class GameModule {}
