/*
 * @Date: 2024-03-26 10:14:13
 * @Description: description
 */
import { Inject, Injectable } from '@nestjs/common';
// import { MyLogger } from './logger2/MyLogger';

@Injectable()
export class AppService {
  // @Inject(MyLogger)
  // private logger: MyLogger;

  getHello(): string {
    // this.logger.log('yyy', AppService.name);

    return 'Hello World!';
  }
}
