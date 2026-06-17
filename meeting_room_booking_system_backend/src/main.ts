import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FormatResponseInterceptor } from './format-response.interceptor';
import { InvokeRecordInterceptor } from './invoke-record.interceptor';
import { UnloginFilter } from './unlogin.filter';
import { CustomExceptionFilter } from './custom-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局启用字段校验通道
  app.useGlobalPipes(new ValidationPipe());
  // 这块让数据格式模板化
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  // 这一块就是打印相关的日志
  app.useGlobalInterceptors(new InvokeRecordInterceptor());
  // 用户没有登录
  app.useGlobalFilters(new UnloginFilter());
  // 调用通用化异常处理, 如dto字段校验
  app.useGlobalFilters(new CustomExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('会议室预定系统')
    .setDescription('api 接口文档')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: '基于 jwt 的认证'
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  const configService = app.get(ConfigService);

  await app.listen(configService.get('nest_server_port') ?? '3000');
}
bootstrap();
