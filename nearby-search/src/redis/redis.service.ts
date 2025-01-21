import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  // 异步添加地理位置信息
  async geoAdd(key: string, posName: string, posLoc: [number, number]) {
    // 返回redisClient.geoAdd方法的结果
    return await this.redisClient.geoAdd(key, {
      // 设置经度
      longitude: posLoc[0],
      // 设置纬度
      latitude: posLoc[1],
      // 设置成员
      member: posName,
    });
  }

  // 异步获取地理位置信息
  async geoPos(key: string, posName: string) {
    // 从redis中获取地理位置信息
    const res = await this.redisClient.geoPos(key, posName);

    // 返回地理位置信息
    return {
      name: posName,
      longitude: res[0].longitude,
      latitude: res[0].latitude,
    };
  }

  // 异步获取地理位置列表
  async geoList(key: string) {
    // 从redis中获取指定key的地理位置列表, 因为 geo 信息底层使用 zset 存储的，所以查询所有的 key 使用 zrange。
    const positions = await this.redisClient.zRange(key, 0, -1);

    // 定义一个空数组，用于存储地理位置信息
    const list = [];
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      const res = await this.geoPos(key, pos);
      list.push(res);
    }
    return list;
  }

  async geoSearch(key: string, pos: [number, number], radius: number) {
    const positions = await this.redisClient.geoRadius(
      key,
      {
        longitude: pos[0],
        latitude: pos[1],
      },
      radius,
      'km',
    );

    const list = [];
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      const res = await this.geoPos(key, pos);
      list.push(res);
    }
    return list;
  }
}
