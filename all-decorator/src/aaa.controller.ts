import {
  Controller,
  Get,
  Req,
  Res,
  Next,
  HttpCode,
  Header,
  Redirect,
  Render,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Controller({ host: ':host.0.0.1', path: 'aaa' })
export class AaaController {
  @Get('bbb')
  hello() {
    return 'hello';
  }

  @Get('ccc')
  ccc(@Req() req: Request) {
    console.log(req.hostname);
    console.log(req.url);
  }

  @Get('ddd')
  ddd(@Res({ passthrough: true }) res: Response) {
    // res.end('ddd');
    return 'ddd';
  }

  @Get('eee')
  eee(@Next() next: NextFunction) {
    console.log('handler1');
    // 当你有两个 handler 来处理同一个路由的时候，可以在第一个 handler 里注入 next，调用它来把请求转发到第二个 handler：
    next();
    return '1111';
  }

  @Get('eee')
  eee2() {
    console.log('handler2');
    return '2222';
  }

  @Get('fff')
  @HttpCode(232)
  fff() {
    return 'hello';
  }

  @Get('ggg')
  @Header('aaa', 'bbb')
  ggg() {
    return 'hello';
  }

  @Get('hhh')
  @Redirect('http://juejin.cn')
  hhh() {
    console.log('重定向');
  }

  @Get('xxx')
  @Redirect()
  async jump() {
    return {
      url: 'https://baidu.com',
      statusCode: 302,
    };
  }

  @Get('user')
  @Render('user')
  user() {
    return {
      name: 'han',
      age: 20,
    };
  }
}
