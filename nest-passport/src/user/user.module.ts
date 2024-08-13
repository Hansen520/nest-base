/*
 * @Date: 2024-08-13 09:50:00
 * @Description: description
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
