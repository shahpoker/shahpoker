// FILE: shahpoker/apps/api/src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { TelegramAuthDto } from './dto/telegram-auth.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    telegramAuthDto: TelegramAuthDto,
  ): Promise<{ access_token: string; user: User }> {
    const { id, first_name, username, photo_url } = telegramAuthDto;

    let user = await this.usersService.findOneByTelegramId(id);

    if (!user) {
      user = await this.usersService.create({
        telegramId: id,
        firstName: first_name,
        nickname: username || `user_${id}`,
        avatarUrl: photo_url,
      });
    } else {
      user = await this.usersService.update(user.id, {
        firstName: first_name,
        nickname: username || user.nickname,
        avatarUrl: photo_url,
        lastLoginAt: new Date(),
      });
    }

    const payload = { telegramId: user.telegramId, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      user: user,
    };
  }
}
