/*
 * @Date: 2024-03-08 17:08:14
 * @Description: description
 */
import { Controller, Inject, Get } from '@nestjs/common';
import {
  CccModuleOptions,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} from './ccc.module-definition';

@Controller('ccc')
export class CccController {
  @Inject(MODULE_OPTIONS_TOKEN)
  // ASYNC_OPTIONS_TYPE  是 async 方式创建模块的 otpion 类型：
  private options: typeof ASYNC_OPTIONS_TYPE;

  @Get('')
  hello() {
    this.options.imports;
    return this.options;
  }
}
