import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import type { IncomingLog, LogResult } from './logging/log.types';
import { LoggingService } from './logging/logging.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('log')
  @HttpCode(HttpStatus.ACCEPTED)
  log(@Body() log: IncomingLog): LogResult {
    return this.loggingService.write(log ?? {});
  }
}
