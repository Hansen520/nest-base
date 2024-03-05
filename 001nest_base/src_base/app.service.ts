import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!12';
  }
}

export class AppService1 {
  getHello(): string {
    return '自定义的Hello World!12';
  }
}
