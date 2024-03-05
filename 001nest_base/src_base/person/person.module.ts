/*
 * @Date: 2023-07-06 10:07:56
 * @Description: description
 */
import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

@Module({
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
