import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      // 授权码换取 token 时会再次发送该地址，必须与 Google 控制台登记值完全一致。
      clientID: configService.get<string>('google_client_id'),
      clientSecret: configService.get<string>('google_client_secret'),
      callbackURL: configService.get<string>('google_callback_url')
        || `http://localhost:${configService.get('nest_server_port') || 3000}/user/callback/google`,
      scope: ['email', 'profile'],
    });
  }

  validate (accessToken: string, refreshToken: string, profile: any) {
    const { name, emails, photos } = profile
    console.log(profile, 24);
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken
    }
    return user;
  }
}
