/*
 * @Date: 2024-03-05 16:33:32
 * @Description: description
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(function(req: Request, res:Response, next: NextFunction) {
    console.log('Time:before', req.url, Date.now());
    next();
    console.log('Time:after', Date.now());
  });
  app.useGlobalInterceptors(new TimeInterceptor());
  // app.useGlobalGuards(new LoginGuard());
  await app.listen(3000);
}
bootstrap();
