/*
 * @Date: 2024-03-08 17:08:05
 * @Description: description
 */
import { Module } from '@nestjs/common';
import { CccController } from './ccc.controller';
import { ConfigurableModuleClass } from './ccc.module-definition';

@Module({
  controllers: [CccController],
})
export class CccModule extends ConfigurableModuleClass {}
