/*
 * @Date: 2024-03-12 13:56:06
 * @Description: description
 */
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Injectable()
export class AaaMiddleware implements NestMiddleware {
  // @Inject(AppService)
  // private readonly appService: AppService;
  constructor(private readonly appService: AppService) {}

  use(req: Request, res: Response, next: () => void) {
    console.log('before');
    console.log('-------' + this.appService.getHello());
    next();
    console.log('after');
  }
}
