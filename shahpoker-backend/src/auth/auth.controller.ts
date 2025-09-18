// FILE: shahpoker/apps/api/src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TelegramAuthDto } from './dto/telegram-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('telegram')
  telegramLogin(@Body() telegramAuthDto: TelegramAuthDto) {
    return this.authService.validateUser(telegramAuthDto);
  }
}
