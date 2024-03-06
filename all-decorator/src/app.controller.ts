/*
 * @Date: 2024-03-06 11:04:00
 * @Description: description
 */
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Optional,
  Post,
  UseFilters,
  Body,
  Put,
  Delete,
  Patch,
  Options,
  Head,
  SetMetadata,
  Headers,
  Ip,
  Session,
  Param,
  ParseIntPipe,
  ParseBoolPipe,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaFilter } from './aaa.filter';
import { CreateAaaDto } from './dto/create-aaa.dto';

@Controller()
@SetMetadata('roles', ['user'])
export class AppController {
  constructor(@Optional() private readonly appService: AppService) {}

  @Optional()
  @Inject('Han')
  private readonly han: Record<string, any>;

  @Get()
  @UseFilters(AaaFilter)
  @SetMetadata('roles', ['admin'])
  getHello(): string {
    console.log(this.han);
    throw new HttpException('xxxx', HttpStatus.BAD_REQUEST);
    return this.appService.getHello();
  }

  @Get('/ccc')
  header(
    @Headers('Accept') accept: string,
    @Headers() headers: Record<string, any>,
  ) {
    console.log(accept, headers);
  }

  @Get('/ip')
  ip(@Ip() ip: string) {
    console.log(ip);
    return ip;
  }

  @Get('/session')
  session(@Session() session) {
    console.log(session);
    if (!session.count) {
      session.count = 0;
    }
    session.count++;
    return session.count;
  }

  @Get('/xxx/:aaa')
  getHello2(
    @Param('aaa', ParseIntPipe) aaa: number,
    @Query('bbb', ParseBoolPipe) bbb: boolean,
  ) {
    console.log(typeof aaa, typeof bbb);
    console.log(aaa, bbb);
    return 'hello';
  }

  @Post('/bbb')
  getHello3(@Body() aaa: CreateAaaDto) {
    console.log(aaa);
    return 'hello';
  }
  @Put()
  getHello4() {
    return 'hello';
  }
  @Delete()
  getHello5() {
    return 'hello';
  }
  @Patch()
  getHello6() {
    return 'hello';
  }
  @Options()
  getHello7() {
    return 'hello';
  }
  @Head()
  getHello8() {
    return 'hello';
  }
}
