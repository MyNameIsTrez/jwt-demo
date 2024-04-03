import { Controller, Get, Request } from '@nestjs/common';

@Controller()
export class ApiUserController {
  @Get('api/user/username')
  username(@Request() req) {
    req;
    return 'Sander';
  }

  @Get('api/user/pfp')
  pfp(@Request() req) {
    req;
    return 123;
  }
}
