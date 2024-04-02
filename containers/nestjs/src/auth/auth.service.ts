import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    return { sub: user.userId, username: user.username };
  }

  async login(user: any) {
    const requestHeaders = new Headers();
    requestHeaders.set('Authorization', `Bearer ` + user.access_token);
    return fetch('https://api.intra.42.fr/v2/me', {
      headers: requestHeaders,
    })
      .then((response) => response.json())
      .then((j) => {
        const payload = { sub: j.id };
        return this.jwtService.sign(payload);
      });
  }
}
