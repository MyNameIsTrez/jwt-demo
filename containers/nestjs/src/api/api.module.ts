import { Module } from '@nestjs/common';
import { UserModule } from './user/api-user.module';

@Module({
  imports: [UserModule],
})
export class ApiModule {}
