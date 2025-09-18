import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private logger: Logger = new Logger('GameGateway');

  afterInit() {
    this.logger.log('GameGateway Initialized!');
  }

  handleConnection(client: Socket) {
    this.logger.log(`✅ Client Connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`❌ Client Disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinTableRoom')
  handleJoinRoom(
    @MessageBody() tableId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(tableId);
    this.logger.log(`Client ${client.id} joined room ${tableId}`);
    client.emit('joinedRoom', `Successfully joined room ${tableId}`);
  }

  @SubscribeMessage('leaveTableRoom')
  handleLeaveRoom(
    @MessageBody() tableId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(tableId);
    this.logger.log(`Client ${client.id} left room ${tableId}`);
  }
}
