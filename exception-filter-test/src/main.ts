/*
 * @Date: 2024-03-14 10:08:58
 * @Description: description
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HelloFilter } from './hello.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalFilters(new HelloFilter());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
