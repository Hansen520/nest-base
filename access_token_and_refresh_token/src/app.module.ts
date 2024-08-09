/*
 * @Date: 2024-06-07 11:19:13
 * @Description: description
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '118.195.176.186',
      port: 28002,
      username: 'root',
      password: '325600',
      database: 'refresh_token_test',
      synchronize: true,
      logging: true,
      entities: [User],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: '30m',
      },
      secret: 'han',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
