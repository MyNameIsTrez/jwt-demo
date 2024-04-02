import { Controller, Get, Redirect, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { CustomAuthGuard } from './custom-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(CustomAuthGuard)
  @Public()
  @Get('auth/login')
  @Redirect()
  async login(@Request() req) {
    const jwt = await this.authService.login(req.user);
    return {
      url:
        process.env.VITE_ADDRESS +
        ':' +
        process.env.FRONTEND_PORT +
        `?jwt=${jwt}`,
      statusCode: 302,
    };
  }

  @Get('auth/profile')
  getProfile(@Request() req) {
    req;
    return 42;
  }
}
