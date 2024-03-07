/*
 * @Date: 2024-03-07 10:31:51
 * @Description: description
 */
import { applyDecorators, Get, UseGuards } from '@nestjs/common';
import { Aaa } from './aaa.decorator';
import { AaaGuard } from './aaa.guard';

// 装饰器(注解)的合并写法
export const Bbb = (path, role) =>
  applyDecorators(Get(path), Aaa(role), UseGuards(AaaGuard));
