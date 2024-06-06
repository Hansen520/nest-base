/*
 * @Date: 2024-06-06 16:53:43
 * @Description: description
 */
import { SetMetadata } from '@nestjs/common';

export const RequireLogin = () => SetMetadata('require-login', true);

export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata('require-permission', permissions);
