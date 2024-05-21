/*
 * @Date: 2024-05-17 11:19:00
 * @Description: description
 */
import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class AppService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  async getHello() {
    const value = await this.redisClient.keys('*');
    console.log(value, 1);
    return 'Hello World!';
  }
}
