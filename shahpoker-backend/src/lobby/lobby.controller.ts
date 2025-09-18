// FILE: shahpoker/apps/api/src/lobby/lobby.controller.ts
import {
  Controller,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LobbyService } from './lobby.service';
import type { Request } from 'express';
import { JoinTableDto } from './dto/join-table.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('lobby')
@UseGuards(JwtAuthGuard) // تمام مسیرهای این کنترلر نیاز به احراز هویت دارند
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @Post('tables/:tableId/join')
  joinTable(
    @Param('tableId', ParseUUIDPipe) tableId: string,
    @Req() req: Request,
    @Body() joinTableDto: JoinTableDto,
  ) {
    const user = req.user as User;
    return this.lobbyService.joinTable(tableId, user, joinTableDto.amount);
  }
}
