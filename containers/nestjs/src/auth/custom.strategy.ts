import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
  constructor(private authService: AuthService) {
    super();
  }

  // I have no idea what type 'request' is, but it is not 'Request' or 'ExecutionContext'
  async validate(request): Promise<any> {
    const code = request.query.code;

    if (code === undefined) {
      throw new UnauthorizedException('No code found');
    }

    const formData = new FormData();
    formData.set('grant_type', 'authorization_code');
    formData.set('client_id', process.env.INTRA_CLIENT_ID || '');
    formData.set('client_secret', process.env.INTRA_CLIENT_SECRET || '');
    formData.set('code', code);
    formData.set(
      'redirect_uri',
      (process.env.VITE_ADDRESS || '') +
        ':' +
        (process.env.BACKEND_PORT || '') +
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
