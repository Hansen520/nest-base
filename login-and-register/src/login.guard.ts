/*
 * @Date: 2024-05-21 10:47:10
 * @Description: description
 */
import {
  Inject,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization || '';

    const bearer = authorization.split(' ');

    if (!bearer || bearer.length !== 2) {
      throw new UnauthorizedException('登录 token 错误');
    }
    const token = bearer[1];
    try {
      const info = this.jwtService.verify(token);
      (request as any).user = info.user;
      return true;
    } catch (e) {
      throw new UnauthorizedException('登录 token 错误, 请重新登录');
    }

    return true;
  }
}
