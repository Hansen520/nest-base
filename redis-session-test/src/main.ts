/*
 * @Date: 2025-01-21 14:03:58
 * @Description: description
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
