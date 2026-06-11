// 这块的前端可以进入 sse-test 下的test 目录下的 sse-test-frontend上面查看

import { BadRequestException, Controller, Get, ParseIntPipe, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync } from 'fs';
import sharp from 'sharp';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    dest: 'uploads'
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return file.path;
  }

  // gif压缩
  @Get('compression')
  async compression(
    @Query('path') filePath: string,
    @Query('color', ParseIntPipe) color: number,
    @Res() res: any
  ) {
    console.log(filePath, color);

    if (!existsSync(filePath)) {
      throw new BadRequestException('文件不存在');
    }

    const data = await sharp(filePath, { animated: true, limitInputPixels: false }).gif({
        colours: color
    }).toBuffer();

    res.set('Content-Disposition', `attachment; filename="dest.gif"`);

    res.send(data);
  }
}
