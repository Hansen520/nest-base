/*
 * @Date: 2024-03-27 17:25:05
 * @Description: description
 */
import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    AaaModule,
    // Logger2Module.register({
    //   // 注册在这里
    //   xxx: 1,
    //   yyy: 2,
    // }),
  ],
  controllers: [AaaController],
  providers: [AaaService],
})
export class AaaModule {}
