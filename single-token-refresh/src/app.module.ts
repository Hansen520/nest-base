/*
 * @Date: 2024-08-09 14:01:57
 * @Description: description
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'han',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
