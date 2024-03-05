import {
  Module,
  OnApplicationBootstrap,
  OnModuleInit,
  OnModuleDestroy,
  BeforeApplicationShutdown,
} from '@nestjs/common';
import { DddService } from './ddd.service';
import { DddController } from './ddd.controller';

@Module({
  controllers: [DddController],
  providers: [DddService],
})
export class DddModule
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
