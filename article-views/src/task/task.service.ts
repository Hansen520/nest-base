/*
 * @Date: 2025-02-20 16:37:06
 * @Description: description
 */
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArticleService } from 'src/article/article.service';

@Injectable()
export class TaskService {
  @Inject()
  private articleService: ArticleService; // 注入articleService，要在那article那边先导入

  // EVERY_DAY_AT_5PM, 定时任务改为下午5点执行
  @Cron(CronExpression.EVERY_DAY_AT_5PM)
  async handleCron() {
    console.log('task execute');
    await this.articleService.flushRedisToDB();
  }
}
