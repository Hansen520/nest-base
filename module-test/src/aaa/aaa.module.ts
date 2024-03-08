/*
 * @Date: 2024-03-08 15:39:06
 * @Description: description
 */
import { Module, forwardRef } from '@nestjs/common';
import { BbbModule } from 'src/bbb/bbb.module';

@Module({
  imports: [forwardRef(() => BbbModule)],
})
export class AaaModule {}
