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
import { MeetingRoomModule } from './meeting-room/meeting-room.module';
import { MeetingRoom } from './meeting-room/entities/meeting-room.entity';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/entities/booking.entity';
import { StatisticModule } from './statistic/statistic.module';
import { MinioModule } from './minio/minio.module';
import { AuthModule } from './auth/auth.module';
import * as path from 'path'
import * as winston from 'winston';
import { utilities, WINSTON_MODULE_NEST_PROVIDER, WinstonLogger, WinstonModule } from 'nest-winston';
import { CustomTypeOrmLogger } from './CustomTypeOrmLogger';
import 'winston-daily-rotate-file';

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
      // Local runs use .dev.env (localhost); production containers use .env.
      // Keep .env as a fallback so shared settings such as JWT remain available.
      envFilePath: process.env.NODE_ENV === 'production'
        ? path.join(__dirname, '.env')
        : [path.join(__dirname, '.dev.env'), path.join(__dirname, '.env')]
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService, WINSTON_MODULE_NEST_PROVIDER],
      useFactory(configService: ConfigService, logger: any) {
        return {
          type: "mysql",
          host: configService.get('mysql_server_host'),
          port: configService.get('mysql_server_port'),
          username: configService.get('mysql_server_username'),
          password: configService.get('mysql_server_password'),
          database: configService.get('mysql_server_database'),
          // synchronize: true, // 用了这个后，数据库会跟着entity的更新实时更新，生产上线后不需要了
          synchronize: false,
          logging: true,
          looger: new CustomTypeOrmLogger(logger),
          entities: [User, Role, Permission, MeetingRoom, Booking],
          poolSize: 10,
          connectorPackage: 'mysql2'
        }
      }
    }),
    // 各种报错信息问题处理
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        level: 'debug',
        transports: [
          // new winston.transports.File({
          //   filename: `${process.cwd()}/log`
          // }),
          // DailyRotateFile 的话要导入 winston-daily-rotate-file 这个才行
          new winston.transports.DailyRotateFile({
            level: configService.get('winston_log_level'),
            dirname: configService.get('winston_log_dirname'),
            filename: configService.get('winston_log_filename'),
            datePattern: configService.get('winston_log_date_pattern'),
            maxSize: configService.get('winston_log_max_size') // 文件最大的为10k， 多出10k就会进行分割
          }),
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike()
            )
          }),
          // 这个Http是专门用来存放日志文件的， 我们在nest里面新建了一个项目 nest new log-server 来存放日志文件
          new winston.transports.Http({
            host: 'localhost',
            port: 3002,
            path: '/log'
          })
        ]
      }),
      inject: [ConfigService]
    }),
    RedisModule,
    EmailModule,
    MeetingRoomModule,
    BookingModule,
    StatisticModule,
    MinioModule,
    AuthModule
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
