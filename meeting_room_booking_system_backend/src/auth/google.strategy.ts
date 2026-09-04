import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    const clientID = configService.get<string>('google_client_id');
    const clientSecret = configService.get<string>('google_client_secret');

    if (!clientID || !clientSecret) {
      throw new Error(
        'Google OAuth is not configured. Set google_client_id and google_client_secret in the environment.',
      );
    }

    super({
      // 授权码换取 token 时会再次发送该地址，必须与 Google 控制台登记值完全一致。
      clientID,
      clientSecret,
      callbackURL:
        configService.get<string>('google_callback_url') ||
        `http://localhost:${configService.get('nest_server_port') || 3000}/user/callback/google`,
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    void refreshToken;
    const email = profile?.emails?.[0]?.value;
    if (!email) {
      throw new Error('Google profile does not contain an email address.');
    }

    return {
      email,
      firstName: profile?.name?.givenName ?? '',
      lastName: profile?.name?.familyName ?? '',
      picture: profile?.photos?.[0]?.value ?? '',
      accessToken,
    };
  }
}
