/*
 * @Date: 2025-02-20 15:26:30
 * @Description: description
 */
import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Article } from './entities/article.entity';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ArticleService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  @Inject(RedisService)
  private redisService: RedisService;

  async findOne(id: number) {
    return await this.entityManager.findOneBy(Article, {
      id,
    });
  }

  // 这个函数用于定时任务, 把数据存入的数据库，也就是将redis数据存入
  async flushRedisToDB() {
    const keys = await this.redisService.keys(`article_*`); // 获取所有以article_开头的key，对keys函数的执行

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      const res = await this.redisService.hashGet(key);

      const [, id] = key.split('_');

      await this.entityManager.update(
        Article,
        { id: +id },
        {
          viewCount: +res.viewCount,
        },
      );
    }
    console.log(keys);
  }

  async view(id: number, userId: string) {
    // const article = await this.findOne(id);

    // // 浏览+1
    // article.viewCount++;

    // await this.entityManager.save(article);
    // return article.viewCount;

    const res = await this.redisService.hashGet(`article_${id}`);

    if (res.viewCount === undefined) {
      // 先从mysql拿
      const article = await this.findOne(id);

      article.viewCount++;

      // 因为数据库里面已经有数据了，所以执行更新就好了
      await this.entityManager.update(
        Article,
        { id },
        { viewCount: article.viewCount },
      );

      await this.redisService.hashSet(`article_${id}`, {
        viewCount: article.viewCount,
        likeCount: article.likeCount,
        collectCount: article.collectCount,
      });

      // 设置一个用户才能累计一次阅读量, 3s后过期
      await this.redisService.set(`user_${userId}_article_${id}`, 1, 3); // 3秒后过期

      return article.viewCount;
    } else {
      const flag = await this.redisService.get(`user_${userId}_article_${id}`);

      if (flag) {
        return +res.viewCount;
      }

      // 设置累计数量
      await this.redisService.hashSet(`article_${id}`, {
        ...res,
        viewCount: +res.viewCount + 1,
      });

      // 设置一个用户才能累计一次阅读量, 3s后过期
      await this.redisService.set(`user_${userId}_article_${id}`, 1, 3); // 3秒后过期
      return +res.viewCount + 1;
    }
  }
}
