import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getJwt(code: string) {
    console.log(`returning code ${code}`);
    return code;
  }
}
