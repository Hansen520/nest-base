import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';
import { Permission } from './user/entities/permission.entity';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { PermissionGuard } from './permission.guard';


@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwt_secret'),
          signOptions: {
            expiresIn: '30m' // 默认 30 分钟
          }
        }
      },
      inject: [ConfigService]
    }),
    UserModule,
    // 这个文件是配置环境变量的文件
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env' // 为什么 .env 不放在根目录呢？ 因为根目录下的配置文件不会自动复制到 dist 目录。 asssets 是指定 build 时复制的文件，watchAssets 是在 assets 变动之后自动重新复制。
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: "mysql",
          host: configService.get('mysql_server_host'),
          port: configService.get('mysql_server_port'),
          username: configService.get('mysql_server_username'),
          password: configService.get('mysql_server_password'),
          database: configService.get('mysql_server_database'),
          synchronize: true,
          logging: true,
          entities: [User, Role, Permission],
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: {
            authPlugin: 'sha256_password',
          }
        }
      }
    }),
    RedisModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [
    AppService, {
      provide: APP_GUARD,
      useClass: LoginGuard // 提供权限核心
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard
    }
  ],
})
export class AppModule { }
