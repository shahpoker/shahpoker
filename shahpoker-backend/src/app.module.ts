// FILE: shahpoker-backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Table } from './tables/entities/table.entity';
import { GameSeat } from './lobby/entities/game-seat.entity';
import { AuthModule } from './auth/auth.module';
import { TablesModule } from './tables/tables.module';
import { LobbyModule } from './lobby/lobby.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Table, GameSeat],
        synchronize: true,
      }),
    }),
    UsersModule,
    TablesModule,
    AuthModule, // <<<< اطمینان از وجود این ماژول در اینجا
    LobbyModule,
    GameModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
