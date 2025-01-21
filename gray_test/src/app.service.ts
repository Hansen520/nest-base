/*
 * @Date: 2025-01-20 16:30:11
 * @Description: description
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello 9999';
  }
}
