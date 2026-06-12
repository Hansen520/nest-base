/**
 * 自定义装饰器模块
 *
 * @description 提供项目专用的装饰器，包括登录验证、权限校验、用户信息获取等
 */
import { createParamDecorator, ExecutionContext, SetMetadata } from "@nestjs/common";
import { Request } from "express";

/**
 * 要求登录装饰器
 *
 * @description 标记接口需要登录才能访问，配合守卫使用
 * @usage `@RequireLogin()`
 */
export const RequireLogin = () => SetMetadata('require-login', true);

/**
 * 要求权限装饰器
 *
 * @description 标记接口需要指定权限才能访问，可传入多个权限码
 * @param permissions 权限码列表，例如 `['ccc', 'ddd']`
 * @usage `@RequirePermission('ccc', 'ddd')`
 */
export const RequirePermission = (...permissions: string[]) => SetMetadata('require-permission', permissions);

/**
 * 用户信息装饰器
 *
 * @description 从请求对象中提取当前登录用户的信息
 * @param data 可选，指定获取用户信息的哪个字段，不传则返回整个用户对象
 * @returns 用户信息（全部或指定字段值）
 * @usage
 * - `@UserInfo()` 获取完整用户对象
 * - `@UserInfo('username')` 获取用户名
 * - `@UserInfo('roles')` 获取用户角色列表
 */
export const UserInfo = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (!request.user) {
        return null;
    }

    return data ? request.user[data] : request.user;
});