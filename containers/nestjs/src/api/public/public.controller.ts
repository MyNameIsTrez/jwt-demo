import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';

@Public()
@Controller('api/public')
export class PublicController {
  @Get('leaderboard')
  leaderboard() {
    return { sander: 42, victor: 69 };
  }
}
