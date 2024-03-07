/*
 * @Date: 2024-03-07 10:31:51
 * @Description: description
 */
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// 自定义装饰器(注解)
export const MyHeaders = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return key ? request.headers[key.toLowerCase()] : request.headers;
  },
);
