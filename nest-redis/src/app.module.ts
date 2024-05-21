/*
 * @Date: 2024-05-17 11:19:00
 * @Description: description
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createClient } from 'redis';

@Module({
  imports: [],
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
          database: 2,
        });
        await client.connect();
        return client;
      },
    },
  ],
})
export class AppModule {}
