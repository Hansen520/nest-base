/*
 * @Date: 2024-03-28 11:25:14
 * @Description: description
 */
import { Controller, Get, Logger, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { WINSTON_LOGGER_TOKEN } from './winston.module';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // private logger = new Logger();
  @Inject(WINSTON_LOGGER_TOKEN)
  private logger;

  @Get()
  getHello(): string {
    this.logger.log('Hello NestJS!1', AppController.name);
    return this.appService.getHello();
  }
}
