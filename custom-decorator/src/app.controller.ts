/*
 * @Date: 2024-03-06 17:56:48
 * @Description: description
 */
import {
  Controller,
  Get,
  SetMetadata,
  UseGuards,
  Headers,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Aaa } from './aaa.decorator';
import { AaaGuard } from './aaa.guard';
import { Bbb } from './bbb.decorator';
import { Ccc } from './ccc.decorator';
import { MyHeaders } from './myHeaders.decorators';
import { MyQuery } from './myQuery.decorators';
import { Ddd } from './ddd.decorator';

function Type(type) {
  return Reflect.metadata('type', type);
}

@Ddd('eee', 'han_Love')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SetMetadata('aaa', 'admin')
  @UseGuards(AaaGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello')
  @Aaa('admin')
  @UseGuards(AaaGuard)
  getHello2(): string {
    return this.appService.getHello();
  }

  @Bbb('hello2', 'admin')
  getHello3(): string {
    return this.appService.getHello();
  }

  @Get('hello4')
  getHello4(@Ccc() c) {
    return c;
  }

  @Get('hello5')
  getHello5(@Headers('Accept') headers1, @MyHeaders('Accept') headers2) {
    console.log('headers1', headers1);
    console.log('headers2', headers2);
  }

  @Get('hello6')
  getHello6(@Query('aaa') aaa, @MyQuery('bbb') bbb) {
    console.log('aaa', aaa);
    console.log('bbb', bbb);
  }

  // 可以使用 Pipe 做参数验证和转换
  @Get('hello7')
  getHello7(
    @Query('aaa', new ParseIntPipe()) aaa,
    @MyQuery('bbb', new ParseIntPipe()) bbb,
  ) {
    console.log('aaa', aaa + 1);
    console.log('bbb', bbb + 1);
  }
}
