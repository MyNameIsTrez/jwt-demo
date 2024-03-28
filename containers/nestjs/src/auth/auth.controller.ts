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
import { JwtAuthGuard } from './jwt-auth.guard';
import { CustomAuthGuard } from './custom-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(CustomAuthGuard)
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
