import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaController } from './aaa.controller';

@Global()
@Module({
  imports: [],
  controllers: [AppController, AaaController],
  providers: [
    AppService,
    {
      provide: 'Han',
      useFactory() {
        return {
          name: 'han1',
        };
      },
    },
  ],
})
export class AppModule {}
