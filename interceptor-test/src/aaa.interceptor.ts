/*
 * @Date: 2024-03-12 14:51:05
 * @Description: description
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AaaInterceptor implements NestInterceptor {
  // constructor(private appService: AppService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log(this.appService.getHello());

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After...${Date.now() - now}ms`)));
  }
}
