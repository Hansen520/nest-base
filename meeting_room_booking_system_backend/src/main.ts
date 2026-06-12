import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FormatResponseInterceptor } from './format-response.interceptor';
import { InvokeRecordInterceptor } from './invoke-record.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局启用字段校验通道
  app.useGlobalPipes(new ValidationPipe());
  // 这块让数据格式模板化
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  // 这一块就是打印相关的日志
  app.useGlobalInterceptors(new InvokeRecordInterceptor());

  const configService = app.get(ConfigService);

  await app.listen(configService.get('nest_server_port') ?? '3000');
}
bootstrap();
