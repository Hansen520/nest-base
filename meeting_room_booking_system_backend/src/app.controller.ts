import { Controller, Get, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { RequirePermission, UserInfo } from './custom.decorator';
import { userInfo } from 'os';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('aaa')
  @SetMetadata('require-login', true)
  // @SetMetadata('require-permission', ['ddd'])
  @RequirePermission('ddd')
  // UserInfo 这边可以连续调用多次装饰器
  aaaa(@UserInfo('username') username: string, @UserInfo() userInfo) {
    console.log(username);
    console.log(userInfo);
    return 'aaa' + JSON.stringify(username) + JSON.stringify(userInfo)
  }

  @Get('bbb')
  bbb() {
    return 'bbb';
  }
}
