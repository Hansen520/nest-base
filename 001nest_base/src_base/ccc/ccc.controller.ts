/*
 * @Author: Hansen
 * @Date: 2023-07-06 17:03:46
 * @LastEditors: Hansen
 * @LastEditTime: 2023-07-07 09:08:13
 * @FilePath: \templated:\nodeProject\nest-base\src\ccc\ccc.controller.ts
 * @Description: description
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  OnApplicationBootstrap,
  BeforeApplicationShutdown,
  OnModuleDestroy,
} from '@nestjs/common';
import { CccService } from './ccc.service';
import { CreateCccDto } from './dto/create-ccc.dto';
import { UpdateCccDto } from './dto/update-ccc.dto';

@Controller('ccc')
export class CccController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown
{
  constructor(private readonly cccService: CccService) {}

  onModuleDestroy() {
    console.log('CccController onModuleDestroy');
  }

  beforeApplicationShutdown(signal?: string) {
    console.log('CccController beforeApplicationShutdown', signal);
  }

  onModuleInit() {
    console.log('CccController OnModuleInit');
  }

  onApplicationBootstrap() {
    console.log('CccController onApplicationBootstrap');
  }

  @Post()
  create(@Body() createCccDto: CreateCccDto) {
    return this.cccService.create(createCccDto);
  }

  @Get()
  findAll() {
    return this.cccService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cccService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCccDto: UpdateCccDto) {
    return this.cccService.update(+id, updateCccDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cccService.remove(+id);
  }
}
