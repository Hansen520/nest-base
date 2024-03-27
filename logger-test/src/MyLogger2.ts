/*
 * @Date: 2024-03-27 17:10:23
 * @Description: description
 */
import { ConsoleLogger, LogLevel } from '@nestjs/common';

export class MyLogger2 extends ConsoleLogger {
  log(message: string, context: string) {
    console.log(`---log---[${context}]---`, message);
  }
}
