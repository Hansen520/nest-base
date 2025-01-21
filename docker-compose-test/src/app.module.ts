/*
 * @Date: 2024-08-16 10:01:42
 * @Description: description
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aaa } from './aaa.entity';
import { createClient } from 'redis';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '118.195.176.186',
      port: 28002,
      username: 'root',
      password: '325600',
      database: 'aaa',
      synchronize: true,
      logging: true,
      entities: [Aaa],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: '118.195.176.186',
            port: 29002,
          },
          username: '',
          password: '325600',
          database: 3,
        });
        await client.connect();
        return client;
      },
    },
  ],
})
export class AppModule {}
