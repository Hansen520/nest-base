/*
 * @Date: 2024-05-17 17:01:02
 * @Description: description
 */
import { Controller, Get, Session, Inject, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Get('ttt')
  ttt(@Res({ passthrough: true }) response: Response) {
    const newToken = this.jwtService.sign({
      count: 1,
    });
    response.setHeader('token', `Bearer ${newToken}`);
    return 'hello';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sss')
  sss(@Session() session: any) {
    console.log(session);
    session.count = session.count ? session.count + 1 : 1;
    return session.count;
  }
}
