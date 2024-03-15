/*
 * @Date: 2024-03-14 10:08:58
 * @Description: description
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { HelloFilter } from './hello.filter';
import { UnLoginFilter } from './unLogin.filter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HelloFilter,
    },
    {
      provide: APP_FILTER,
      useClass: UnLoginFilter,
    },
  ],
})
export class AppModule {}
