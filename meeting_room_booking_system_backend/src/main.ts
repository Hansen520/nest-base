import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FormatResponseInterceptor } from './format-response.interceptor';
import { InvokeRecordInterceptor } from './invoke-record.interceptor';
import { UnloginFilter } from './unlogin.filter';
import { CustomExceptionFilter } from './custom-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

/**
 * 创建并启动 Nest 应用。
 * 启动阶段集中注册全局请求处理能力、静态资源和接口文档，
 * 最后读取配置中的端口并开始监听 HTTP 请求。
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 自动校验 DTO 中的 class-validator 规则，拦截非法请求参数。
  app.useGlobalPipes(new ValidationPipe());

  // 统一成功响应的数据结构，便于客户端按固定格式处理结果。
  app.useGlobalInterceptors(new FormatResponseInterceptor());

  // 记录每次请求的调用信息，例如请求路径、耗时和处理结果。
  app.useGlobalInterceptors(new InvokeRecordInterceptor());

  // 处理未登录请求，并返回统一的认证提示。
  app.useGlobalFilters(new UnloginFilter());

  // 统一处理应用异常，包括 DTO 校验失败等客户端错误。
  app.useGlobalFilters(new CustomExceptionFilter());

  // 将 uploads 映射为静态资源目录，使上传文件可以通过 /uploads 直接访问。
  app.useStaticAssets('uploads', {
    prefix: '/uploads'
  });

  // 配置 Swagger 接口文档的标题、描述、版本及 JWT Bearer 鉴权方式。
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
  // 将生成的文档挂载到 /api-doc 路径。
  SwaggerModule.setup('api-doc', app, document);

  // 从全局 ConfigModule 获取环境变量和应用配置。
  const configService = app.get(ConfigService);

  // 使用 AppModule 中配置的 Winston provider 作为 Nest 全局日志实现。
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // 监听配置指定的端口；未配置时默认使用 3000。
  await app.listen(configService.get('nest_server_port') ?? '3000');
}
bootstrap();
