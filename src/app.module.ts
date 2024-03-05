import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, AppService1 } from './app.service';
import { AaaController } from './aaa/aaa.controller';
import { AaaModule } from './aaa/aaa.module';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';
import { BbbModule } from './bbb/bbb.module';
import { CccModule } from './ccc/ccc.module';
import { DddModule } from './ddd/ddd.module';

@Module({
  imports: [
    AaaModule,
    XxxModule,
    PersonModule,
    BbbModule,
    CccModule,
    DddModule,
  ],
  controllers: [AppController, AaaController],
  providers: [
    AppService, //相当于 { provide: 'app_service', useClass: AppService }
    {
      // 上面完整的写法
      provide: 'app-service1',
      useClass: AppService1,
    },
    {
      provide: 'person',
      useValue: {
        name: 'abc',
        desc: 2,
      },
    },
    {
      provide: 'person2',
      useFactory() {
        return {
          name: 'bbc',
          desc: 'desc-down',
        };
      },
    },
    {
      provide: 'person3',
      // 在调用 useFactory 方法的时候，Nest 就会注入这两个对象
      useFactory(person: { name: string }, appService: AppService) {
        return {
          name: person.name,
          desc: appService.getHello(),
        };
      },
      // 通过 inject 声明了两个 token，一个是字符串 token 的 person，一个是 class token 的 AppService。
      inject: ['person', AppService],
    },
    {
      provide: 'person5',
      async useFactory() {
        await new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });
        return {
          name: 'person5-----bbb',
          desc1: 'desc1-----56789',
          age: 1,
        };
      },
    },
    // provider 还可以通过 useExisting 来指定别名
    {
      provide: 'person4',
      useExisting: 'person2',
    },
  ],
})
export class AppModule {}
