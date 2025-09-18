// FILE: shahpoker/apps/api/src/game/websocket.service.ts
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Server } from 'ws';
import { HttpAdapterHost } from '@nestjs/core';

@Injectable()
export class WebSocketService implements OnApplicationBootstrap {
  public wss: Server;

  // HttpAdapterHost را به constructor تزریق می‌کنیم
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  // این متد بعد از اینکه کل اپلیکیشن آماده شد، به صورت خودکار اجرا می‌شود
  onApplicationBootstrap() {
    // از طریق آداپتور به سرور HTTP دسترسی پیدا می‌کنیم
    const server = this.httpAdapterHost.httpAdapter.getHttpServer();

    this.wss = new Server({ server });

    this.wss.on('connection', (ws) => {
      console.log('✅✅✅ A client has connected! ✅✅✅');
      ws.on('error', console.error);
      ws.on('message', (data) => {
        console.log('received: %s', data);
      });
      ws.send('Welcome from the new WebSocketService!');
    });

    console.log('✅ Custom WebSocket Server Initialized on Bootstrap!');
  }
}
