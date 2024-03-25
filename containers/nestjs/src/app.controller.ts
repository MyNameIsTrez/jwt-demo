import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CodeDto } from './code.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  login(@Body() message: CodeDto) {
    return this.appService.getJwt(message.code);
  }
}
