import { Global, Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';

/* Global 是全局，导出下面的模块为全局使用， 不过全局模块还是尽量少用，不然注入的很多 provider 都不知道来源，会降低代码的可维护性。 */
// @Global()
@Module({
  controllers: [AaaController],
  providers: [AaaService],
  exports: [AaaService],
})
export class AaaModule {}
