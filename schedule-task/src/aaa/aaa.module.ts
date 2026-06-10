import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';

@Module({
  controllers: [AaaController],
  providers: [AaaService],
  exports: [AaaService] // 导出AaaService模块交由其他地方使用
})
export class AaaModule {}

