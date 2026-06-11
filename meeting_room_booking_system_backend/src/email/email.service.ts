import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { createTransport, Transporter} from 'nodemailer';

@Injectable()
export class EmailService {

  transporter: Transporter

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false,
        auth: {
            user: '646380243@qq.com',
            pass: 'xpzmslrdwgllbbdi'
      },
    })
  }

  async sendMail({ to, subject, html }) {
    // 通过这个可以向我邮箱发送数据
      await this.transporter.sendMail({
        from: {
          name: '会议室预定系统',
          address: '646380243@qq.com'
        },
        to,
        subject,
        html
      });
    }

  create(createEmailDto: CreateEmailDto) {
    return 'This action adds a new email';
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
