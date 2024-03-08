/*
 * @Date: 2024-03-08 14:28:09
 * @Description: description
 */
import {
  Controller,
  Get,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaGuard } from './aaa.guard';
import { AaaInterceptor } from './aaa.interceptor';

@Controller()
@SetMetadata('roles', ['user'])
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AaaGuard)
  @UseInterceptors(AaaInterceptor)
  @SetMetadata('roles', ['admin'])
  getHello(): string {
    return this.appService.getHello();
  }
}
