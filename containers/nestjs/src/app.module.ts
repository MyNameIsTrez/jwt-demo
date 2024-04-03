import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [ConfigModule.forRoot(), ApiModule, AuthModule],
  providers: [AppGateway],
})
export class AppModule {}
