import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
  constructor(private configService: ConfigService) {
    super();
  }

  async validate(request: any): Promise<any> {
    const code = request.query.code;

    if (code === undefined) {
      throw new UnauthorizedException('No code found');
    }

    const formData = new FormData();
    formData.set('grant_type', 'authorization_code');
    formData.set('client_id', this.configService.getOrThrow('INTRA_CLIENT_ID'));
    formData.set(
      'client_secret',
      this.configService.getOrThrow('INTRA_CLIENT_SECRET'),
    );
    formData.set('code', code);
    formData.set(
      'redirect_uri',
      this.configService.getOrThrow('VITE_ADDRESS') +
        ':' +
        this.configService.getOrThrow('BACKEND_PORT') +
        '/auth/login',
    );

    return fetch('https://api.intra.42.fr/oauth/token', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((j) => {
        const access_token: string = j.access_token;
        if (access_token === undefined) {
          throw new UnauthorizedException(
            'Could not retrieve your 42 access token',
          );
        }
        return { access_token };
      })
      .catch((err) => {
        console.error(err);
        if (err instanceof UnauthorizedException) {
          throw err;
        }
        throw new InternalServerErrorException();
      });
  }
}
