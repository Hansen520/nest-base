/*
 * @Date: 2024-05-17 17:01:02
 * @Description: description
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'kkk',
      resave: false,
      saveUninitialized: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
