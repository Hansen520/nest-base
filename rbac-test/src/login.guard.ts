import {
  Inject,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

declare module 'express' {
  interface Request {
    user: {
      username: string;
      roles: string[];
    };
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject()
  private reflector: Reflector;

  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const requireLogin = this.reflector.getAllAndOverride('require-login', [
      context.getClass(),
      context.getHandler(),
    ]);

    console.log(requireLogin);

    // 避免login的时候也需要token，如果目标 handler 或者 controller 不包含 require-login 的 metadata，那就放行，否则才检查 jwt。
    if (!requireLogin) {
      return true;
    }
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    try {
      const token = authorization.split(' ')[1];
      // 验证token
      const payload = this.jwtService.verify(token);
      request.user = payload.user;
      return true;
    } catch (e) {
      throw new UnauthorizedException('token 失效 ，请重新登录');
    }
  }
}
