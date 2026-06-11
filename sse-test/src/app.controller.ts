import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { exec } from 'child_process';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('stream')
  stream() {
    return new Observable((observer) => {

      observer.next({ data: { msg: 'aaa' } });

      setInterval(() => {
        observer.next({ data: { msg: Math.random() + 'bbb' } });
      }, 2000);

      setTimeout(() => {
        observer.next({ data: { msg: 'ccc' } });
      }, 5000);

    });
  }

  @Sse('stream2')
  stream2() {
    const childProcess = exec('tail -f ./log');

    return new Observable((observer) => {
      childProcess.stdout?.on('data', (msg) => {
        console.log(msg, 37);
        observer.next({ data: { msg: msg.toString() } });
      });

      childProcess.on('error', (err) => {
        observer.error(err);
      });

      childProcess.on('close', (_code) => {
        observer.complete();
      });

      // teardown: 客户端断开时杀掉子进程
      return () => {
        childProcess.kill();
      };
    });
  }

  @Sse('stream3')
  stream3() {
    return new Observable((observer) => {
      const json = readFileSync('./package.json').toJSON();
      observer.next({ data: { msg: json } });
    });
  }

}
