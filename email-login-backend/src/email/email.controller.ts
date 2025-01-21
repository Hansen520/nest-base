import { Controller, Get, Inject, Query } from '@nestjs/common';
import { EmailService } from './email.service';
import { RedisService } from 'src/redis/redis.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Inject()
  private redisService: RedisService;

  @Get('code')
  async sendEmailCode(@Query('address') address) {
    const code = Math.random().toString().slice(2, 8);
    // 存入redis, 用于后续的对比
    await this.redisService.set(`captcha_${address}`, code, 5 * 60);
    await this.emailService.sendMail({
      to: address,
      subject: '验证码',
      html: `<h1>您的验证码是：${code}</h1>`,
    });
    return '发送成功了';
  }
}
