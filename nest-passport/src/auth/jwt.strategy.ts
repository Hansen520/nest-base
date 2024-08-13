/*
 * @Date: 2024-08-13 10:26:26
 * @Description: description
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log(ExtractJwt.fromAuthHeaderAsBearerToken(), 12);
    // 这边就是密钥来源
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken() ||
        ExtractJwt.fromHeader('token'), // 这边就是拿到头部的Bearer 的那个token 或者是header的token
      ignoreExpiration: false,
      secretOrKey: 'han1',
    });
  }
  async validate(payload: any) {
    // console.log(payload);
    return { userId: payload.sub, username: payload.username };
  }
}
