/*
 * @Date: 2024-03-28 14:10:17
 * @Description: description
 */

import { DynamicModule } from '@nestjs/common';
import { LoggerOptions } from 'winston';
import { MyLogger } from './MyLogger';

// 导出的值被app所导入
export const WINSTON_LOGGER_TOKEN = 'WINSTON_LOGGER';

export class WinstonModule {
  public static forRoot(options: LoggerOptions): DynamicModule {
    return {
      module: WinstonModule,
      providers: [
        {
          provide: WINSTON_LOGGER_TOKEN,
          useValue: new MyLogger(options),
        },
      ],
      exports: [WINSTON_LOGGER_TOKEN], // 导出的值被app.get引用
    };
  }
}
