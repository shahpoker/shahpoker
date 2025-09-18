// FILE: shahpoker/apps/api/src/lobby/lobby.module.ts
import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { LobbyController } from './lobby.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameSeat } from './entities/game-seat.entity';
import { UsersModule } from 'src/users/users.module';
import { TablesModule } from 'src/tables/tables.module';
import { GameModule } from 'src/game/game.module'; // <<<< این خط بسیار مهم است

@Module({
  imports: [
    TypeOrmModule.forFeature([GameSeat]),
    UsersModule,
    TablesModule,
    GameModule, // <<<< و همچنین این خط
  ],
  providers: [LobbyService],
  controllers: [LobbyController],
})
export class LobbyModule {}
