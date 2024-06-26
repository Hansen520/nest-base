/*
 * @Date: 2024-05-21 14:03:00
 * @Description: description
 */
import { Module, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PermissionGuard } from './permission.guard';

@Module({
  controllers: [UserController],
  providers: [UserService, PermissionGuard],
  exports: [UserService, PermissionGuard],
})
export class UserModule {}
