// 响应内容的拦截器
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const response = context.switchToHttp().getResponse<Response>();

    // z这一步就是返回模板化的内容
    return next.handle().pipe(map((data) => {
      return {
        code: response.statusCode,
        message: 'success',
        data
      }
    }));
  }
}
