/*
 * @Date: 2024-08-13 10:32:54
 * @Description: description
 */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const IsPublic = (...args: string[]) => {
  return SetMetadata(IS_PUBLIC_KEY, args);
};
