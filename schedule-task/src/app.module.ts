import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';
import { AaaModule } from './aaa/aaa.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AaaModule
  ],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule {}
