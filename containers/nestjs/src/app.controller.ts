import { Body, Controller, ExecutionContext, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CodeDto } from './code.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // curl -X POST localhost:3000/login -d '{"code": "bar"}' -H "Content-Type: application/json"
  @Post('login')
  login(@Body() codeDto: CodeDto) {
    return this.appService.getJwt(codeDto.code);
  }

  // curl localhost:3000/getUsername -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lYmFyIiwiaWF0IjoxNzExMzc5OTQ2fQ.5qJyYknKIB-NlJuylNllUxh9y6vqMGH52m73Hp0m-bY"
  @Get('getUsername')
  getUsername(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log(`request: ${request}`);
    const [key, value] = request.headers.authorization?.split(' ') ?? [];
    console.log(`key: ${key}, value: ${value}`);
    const bearer_token = key === 'Bearer' ? value : undefined;
    console.log(`bearer_token: ${bearer_token}`);
    return this.appService.getUsername(bearer_token);
  }
}
