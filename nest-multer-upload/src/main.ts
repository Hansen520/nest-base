/*
 * @Date: 2024-03-14 16:51:17
 * @Description: description
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  await app.listen(3000);
}
bootstrap();
