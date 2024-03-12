/*
 * @Date: 2024-03-12 14:48:34
 * @Description: description
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AaaInterceptor } from './aaa.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new AaaInterceptor());
  await app.listen(3000);
}
bootstrap();
