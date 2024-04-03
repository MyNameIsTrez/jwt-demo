import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [ChatGateway], // TODO: Remove?
  exports: [ChatGateway],
})
export class ChatModule {}
