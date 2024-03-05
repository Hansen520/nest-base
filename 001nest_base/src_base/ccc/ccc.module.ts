/*
 * @Author: Hansen
 * @Date: 2023-07-06 17:03:46
 * @LastEditors: Hansen
 * @LastEditTime: 2023-07-07 09:07:04
 * @FilePath: \templated:\nodeProject\nest-base\src\ccc\ccc.module.ts
 * @Description: description
 */
import {
  Module,
  OnApplicationBootstrap,
  OnModuleInit,
  OnModuleDestroy,
  BeforeApplicationShutdown,
} from '@nestjs/common';
import { CccService } from './ccc.service';
import { CccController } from './ccc.controller';

@Module({
  controllers: [CccController],
  providers: [CccService],
})
export class CccModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown
{
  onModuleDestroy() {
    console.log('CccModule onModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('CccModule beforeApplicationShutdown', signal);
  }
  onModuleInit() {
    console.log('CCCModule OnModuleInit');
  }

  onApplicationBootstrap() {
    console.log('CCCModule onApplicationBootstrap');
  }
}
