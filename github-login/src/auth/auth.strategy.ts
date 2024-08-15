/*
 * @Date: 2024-08-15 10:12:44
 * @Description: description
 */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: 'Ov23liPsg7pxupYsMXah',
      clientSecret: 'ad3604a0147924406fcd2f597fb234a188cae1f9',
      callbackURL: 'http://localhost:3000/callback', // 登录成功后的回调
      scope: ['public_profile'], // 请求的数据范围
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return profile;
  }
}
