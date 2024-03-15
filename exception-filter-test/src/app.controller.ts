/*
 * @Date: 2024-03-14 10:08:58
 * @Description: description
 */
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  BadRequestException,
  BadGatewayException,
  Post,
  Body,
} from '@nestjs/common';
import { AaaDto } from './aaa.dto';
import { AppService } from './app.service';
import { UnLoginException } from './unLogin.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // throw new BadGatewayException('yyyy');
    // throw new BadRequestException('This is a bad Apple');
    // throw new HttpException('This is a bad Apple', HttpStatus.BAD_REQUEST);
    throw new UnLoginException();
    return this.appService.getHello();
  }

  @Post('aaa')
  aaa(@Body() aaaDto: AaaDto) {
    return 'success';
  }
}
