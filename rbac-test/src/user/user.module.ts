/*
 * @Date: 2024-06-06 10:13:54
 * @Description: description
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  // 导入其他模块
})
export class UserModule {}
