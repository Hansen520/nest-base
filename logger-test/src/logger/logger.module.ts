/*
 * @Date: 2024-03-27 17:23:20
 * @Description: description
 */
import { Global, Module } from '@nestjs/common';
import { MyLogger } from 'src/MyLogger';
// 注入了MyLogger的内容
@Global()
@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
