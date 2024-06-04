/*
 * @Date: 2024-05-21 16:20:25
 * @Description: description
 */
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Reflector } from '@nestjs/core';
import { RedisService } from './../redis/redis.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector;

  @Inject(RedisService)
  private redisService: RedisService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const user = request.session.user;
    console.log(33000000000);
    if (!user) {
      throw new UnauthorizedException('用户未登录1');
    }
    console.log(36000000000);
    let permissions = await this.redisService.listGet(
      `user_${user.username}_permissions`,
    );
    console.log(permissions, 40000000000);
    if (permissions.length === 0) {
      console.log(11111111111);
      const foundUser = await this.userService.findByUsername(user.username);
      permissions = foundUser.permissions.map((item) => item.name);

      this.redisService.listSet(
        `user_${user.username}_permissions`,
        permissions,
        60 * 30,
      );
    }
    const foundUser = await this.userService.findByUsername(user.username);

    const permission = this.reflector.get('permission', context.getHandler());

    if (foundUser.permissions.some((item) => item.name === permission)) {
      return true;
    } else {
      throw new UnauthorizedException('没有权限访问该接口');
    }
  }
}
