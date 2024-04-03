import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'http';
import { JwtService } from '@nestjs/jwt';

// The cors setting prevents this error:
// "Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource"
@WebSocketGateway({ cors: { origin: '*' } })
export class AppGateway {
  constructor(private jwtService: JwtService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected');

    const authorization = client.handshake.headers.authorization;
    const jwt = authorization.split(' ')[1];

    try {
      this.jwtService.verify(jwt);
    } catch (e) {
      console.error('Disconnecting client because verifying their jwt failed');
      client.disconnect();
    }
  }

  afterInit() {
    const interval_ms = 1000;
    setInterval(() => {
      this.server.emit('pong', 'lmao');
    }, interval_ms);
  }

  @SubscribeMessage('foo')
  async foo(@ConnectedSocket() client: Socket, @MessageBody() body) {
    console.log('foo');
  }
}
