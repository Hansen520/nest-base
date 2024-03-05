import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
} from '@nestjs/common';
import { CreateDddDto } from './dto/create-ddd.dto';
import { UpdateDddDto } from './dto/update-ddd.dto';

@Injectable()
export class DddService
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

  create(createDddDto: CreateDddDto) {
    return 'This action adds a new ddd';
  }

  findAll() {
    return `This action returns all ddd`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ddd`;
  }

  update(id: number, updateDddDto: UpdateDddDto) {
    return `This action updates a #${id} ddd`;
  }

  remove(id: number) {
    return `This action removes a #${id} ddd`;
  }
}
