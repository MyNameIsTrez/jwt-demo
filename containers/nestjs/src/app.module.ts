import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { PongModule } from './pong/pong.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ApiModule, AuthModule, ChatModule, PongModule],
})
export class AppModule {}
