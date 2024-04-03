import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'http';
import { JwtService } from '@nestjs/jwt';

// TODO: Is this still necessary?
// The cors setting prevents this error:
// "Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource"
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  constructor(private jwtService: JwtService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('in chat');

    console.log('client.id in handleConnection():', client.id);
    console.log('Client connected   ');

    const authorization = client.handshake.headers.authorization;
    const jwt = authorization.split(' ')[1];

    try {
      this.jwtService.verify(jwt);
    } catch (e) {
      console.error('Disconnecting client because verifying their jwt failed');
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected in chat: ${client.id}`);
  }

  @SubscribeMessage('chat/joinRoom')
  async joinRoom(@ConnectedSocket() client: Socket) {
    console.log('client.id in chat/joinRoom():', client.id);
    console.log('Joining room');
  }
}
