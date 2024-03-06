import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OtherService } from './other/other.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, OtherService],
})
export class AppModule {
  constructor() {
    console.log('AppModule');
  }
}
