import { Module } from '@nestjs/common';
import { PongGateway } from './pong.gateway';

@Module({
  providers: [PongGateway], // TODO: Remove?
  exports: [PongGateway],
})
export class PongModule {}
