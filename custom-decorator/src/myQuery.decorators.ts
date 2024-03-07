/*
 * @Date: 2024-03-07 10:31:51
 * @Description: description
 */
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

// 自定义装饰器(注解)
export const MyQuery = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.query[key];
  },
);
