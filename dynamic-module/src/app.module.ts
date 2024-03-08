/*
 * @Date: 2024-03-08 16:17:14
 * @Description: description
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BbbModule } from './bbb/bbb.module';
import { CccModule } from './ccc/ccc.module';

@Module({
  imports: [
    BbbModule.register({
      aaa: 1,
      bbb: 2,
      ccc: 3,
    }),
    // CccModule.forRoot()
    CccModule.register({
      aaa: 1,
      bbb: 'bbb',
      isGlobal: true,
    }),
    // CccModule.registerAsync({
    //   useFactory: async () => {
    //     await 111;
    //     return {
    //       aaa: 222,
    //       bbb: 'bbb',
    //     };
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
