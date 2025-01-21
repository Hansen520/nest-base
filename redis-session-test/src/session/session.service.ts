import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class SessionService {
  @Inject(RedisService)
  private redisService: RedisService;

  // 异步设置session
  async setSession(
    sid: string, // session id
    value: Record<string, any>, // session值
    ttl: number = 30 * 60, // session过期时间，默认为30分钟
  ) {
    if (!sid) {
      sid = this.generateSid(); // 如果没有传入sid，则生成一个新的sid
    }
    await this.redisService.hashSet(`sid_${sid}`, value, ttl); // 设置sid作为key，session值作为value，他是一个obj，并设置过期时间
    return sid;
  }

  // 异步获取session
  async getSession<SessionType extends Record<string, any>>(
    sid: string,
  ): Promise<SessionType>;
  // 根据sid获取session
  async getSession(sid: string) {
    // 从redis中获取sid对应的session
    return await this.redisService.hashGet(`sid_${sid}`);
  }

  // 生成一个随机字符串
  generateSid() {
    // 生成一个随机数
    return Math.random().toString().slice(2, 12);
  }
}
