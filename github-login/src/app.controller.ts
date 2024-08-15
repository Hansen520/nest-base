/*
 * @Date: 2024-08-14 14:17:38
 * @Description: description
 */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('login')
  @UseGuards(AuthGuard('github'))
  async login() {}
}
