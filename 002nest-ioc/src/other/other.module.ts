/*
 * @Date: 2024-03-05 15:54:22
 * @Description: description
 */
import { Module } from '@nestjs/common';
import { OtherService } from './other.service';

@Module({
  imports: [],
  controllers: [OtherService],
  providers: [OtherService],
})
export class OtherModule {}
