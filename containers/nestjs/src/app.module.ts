import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { PongModule } from './pong/pong.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApiModule,
    AuthModule,
    ChatModule,
    PongModule,
  ],
})
export class AppModule {}
