/*
 * @Date: 2024-03-07 10:31:51
 * @Description: description
 */
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// 自定义装饰器(注解)
export const Ccc = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    return 'ccc';
  },
);
