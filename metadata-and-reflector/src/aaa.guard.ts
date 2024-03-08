import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AaaGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('guard');
    // console.log(context.getHandler());
    console.log(this.reflector.get('roles', context.getHandler()));
    console.log(this.reflector.get('roles', context.getClass()));
    return true;
  }
}
