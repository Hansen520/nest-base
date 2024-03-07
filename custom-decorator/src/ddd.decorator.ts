/*
 * @Date: 2024-03-07 10:31:51
 * @Description: description
 */
import { Controller, SetMetadata, applyDecorators } from '@nestjs/common';

// 自定义装饰器(注解)
export const Ddd = (path, metadata) => {
  return applyDecorators(Controller(path), SetMetadata('ddd', metadata));
};
