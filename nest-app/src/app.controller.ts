import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(/*@Headers() headers*/): string {
    // console.log(headers);
    console.log('access');
    return this.appService.getHello();
  }
}
