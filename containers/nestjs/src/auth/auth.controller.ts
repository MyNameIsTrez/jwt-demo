import {
  Controller,
  Get,
  Redirect,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get('auth/login')
  @Redirect()
  async login(@Request() req) {
    const code = req.query.code;
    if (code === undefined) {
      // TODO: Redirect to login page instead
      throw new UnauthorizedException('No code found');
    }

    const access_token = await this.authService.getAccessToken(code);

    const jwt = await this.authService.login(access_token);
    return {
      url:
        process.env.VITE_ADDRESS +
        ':' +
        process.env.FRONTEND_PORT +
        `?jwt=${jwt}`,
      statusCode: 302,
    };
  }

  // TODO: Move this to users/users.controller.ts
  @Get('profile/username')
  username(@Request() req) {
    req;
    return 'Sander';
  }

  // TODO: Move this to users/users.controller.ts
  @Get('profile/pfp')
  pfp(@Request() req) {
    req;
    return 123;
  }
}
