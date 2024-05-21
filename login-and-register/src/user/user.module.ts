/*
 * @Date: 2024-05-20 16:40:48
 * @Description: description
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // 导入实体
  ], // 导入其他模块
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
