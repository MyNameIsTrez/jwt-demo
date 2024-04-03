import { Controller, Get, Request } from '@nestjs/common';

@Controller()
export class UserController {
  @Get('api/user/username')
  username(@Request() req) {
    req;
    return 'Sander';
  }
}
