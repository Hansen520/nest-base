/*
 * @Date: 2025-01-21 17:19:14
 * @Description: description
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // transform 指定为 true，这样会自动把参数的 js 对象转换为 dto 类型对象。
    }),
  );

  await app.listen(3000);
}
bootstrap();
