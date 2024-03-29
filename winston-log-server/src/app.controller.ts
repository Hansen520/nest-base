/*
 * @Date: 2024-03-28 11:00:09
 * @Description: description
 */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('log')
  log(@Body() body) {
    console.log(body);
  }
}
