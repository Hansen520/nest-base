/*
 * @Date: 2024-08-13 10:39:14
 * @Description: description
 */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/is-public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // 在canActivate方法中，我们使用@Reflector装饰器来获取路由或控制器上定义的IS_PUBLIC_KEY元数据。
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(isPublic, 21);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
