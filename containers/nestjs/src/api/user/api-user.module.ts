import { Module } from '@nestjs/common';
import { ApiUserController } from './api-user.controller';

@Module({
  controllers: [ApiUserController],
})
export class UserModule {}
