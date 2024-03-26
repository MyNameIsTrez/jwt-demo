import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService) {}

  getJwt(code: string) {
    console.log(`code: ${code}`);
    const payload = { username: 'username' + code };
    // const payload = code;
    console.log(`payload: ${payload}`);
    const returned = this.jwtService.sign(payload);
    console.log(`returned: ${returned}`);
    return returned;
  }

  getUsername(bearer_token: string) {
    return 'foo' + bearer_token;
  }
}
