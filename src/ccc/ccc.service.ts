/*
 * @Author: Hansen
 * @Date: 2023-07-06 17:03:46
 * @LastEditors: Hansen
 * @LastEditTime: 2023-07-07 09:06:38
 * @FilePath: \templated:\nodeProject\nest-base\src\ccc\ccc.service.ts
 * @Description: description
 */
import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
  OnModuleDestroy,
  BeforeApplicationShutdown,
} from '@nestjs/common';
import { CreateCccDto } from './dto/create-ccc.dto';
import { UpdateCccDto } from './dto/update-ccc.dto';

@Injectable()
export class CccService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown
{
  onModuleDestroy() {
    console.log('CccService onModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('CccService beforeApplicationShutdown', signal);
  }

  onModuleInit() {
    console.log('CccService OnModuleInit');
  }

  onApplicationBootstrap() {
    console.log('CccService onApplicationBootstrap');
  }
  create(createCccDto: CreateCccDto) {
    return 'This action adds a new ccc';
  }

  findAll() {
    return `This action returns all ccc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ccc`;
  }

  update(id: number, updateCccDto: UpdateCccDto) {
    return `This action updates a #${id} ccc`;
  }

  remove(id: number) {
    return `This action removes a #${id} ccc`;
  }
}
