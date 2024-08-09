/*
 * @Date: 2024-08-09 14:01:57
 * @Description: description
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    exposedHeaders: ['token'],
  });
  await app.listen(3000);
}
bootstrap();
