/*
 * @Date: 2024-03-27 17:10:23
 * @Description: description
 */
import { Injectable, ConsoleLogger, Inject, LogLevel } from '@nestjs/common';
import { AppService } from './app.service';

@Injectable()
export class MyLogger3 extends ConsoleLogger {
  @Inject(AppService)
  private appService: AppService;

  log(message, context) {
    console.log(this.appService.getHello());
    console.log(`[${context}]`, message);
    console.log('--------------');
  }
}
