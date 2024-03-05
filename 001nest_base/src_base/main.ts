/*
 * @Date: 2023-07-06 09:37:40
 * @Description: description
 */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public', { prefix: '/static' });
  await app.listen(3000);

  // setTimeout(() => {
  //   app.close();
  // }, 3000);
}
bootstrap();
