import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public() // TODO: Remove?
  @HttpCode(HttpStatus.OK) // TODO: Does a valid request automatically already return 200, or does it return 201?
  @Post('login')
  login(@Request() req) {
    console.log(`HTTP login() called`); // TODO: REMOVE
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
