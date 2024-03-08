/*
 * @Date: 2024-03-08 15:39:06
 * @Description: description
 */
import { Module, forwardRef } from '@nestjs/common';
import { AaaModule } from 'src/aaa/aaa.module';

@Module({
  imports: [forwardRef(() => AaaModule)],
})
export class BbbModule {}
