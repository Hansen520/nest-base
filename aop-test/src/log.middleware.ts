/*
 * @Date: 2024-03-05 17:38:03
 * @Description: description
 */
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('before2', req.url, Date.now());
    next();
    console.log('after2', Date.now());
  }
}
