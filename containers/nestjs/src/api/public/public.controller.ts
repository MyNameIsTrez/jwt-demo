import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';

@Public()
@Controller()
export class PublicController {
  @Get('api/public/leaderboard')
  leaderboard() {
    return { sander: 42, victor: 69 };
  }
}
