/*
 * @Date: 2025-02-19 16:05:49
 * @Description: description
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get('email_user'), // generated ethereal user
        pass: this.configService.get('email_pass'), // generated ethereal password
      },
    });
  }

  async sendMail({ to, subject, html }: any) {
    await this.transporter.sendMail({
      from: {
        name: '爱你100分',
        address: this.configService.get('email_user'),
      },
      to,
      subject,
      html,
    });
  }
}
