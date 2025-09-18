// FILE: shahpoker/apps/api/src/users/users.controller.ts
import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Request } from 'express';
import { AddBalanceDto } from './dto/add-balance.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  // توجه: این Endpoint فقط برای تست است و در آینده باید دسترسی آن به ادمین محدود شود
  @Post(':id/add-balance')
  addBalance(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() addBalanceDto: AddBalanceDto,
  ) {
    return this.usersService.addBalance(id, addBalanceDto.amount);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
