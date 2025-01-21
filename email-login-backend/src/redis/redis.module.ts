/*
 * @Date: 2025-02-19 17:24:59
 * @Description: description
 */
import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { createClient } from 'redis';

@Global()
@Module({
  controllers: [RedisController],
  providers: [
    RedisService,
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
  exports: [RedisService],
})
export class RedisModule {}
