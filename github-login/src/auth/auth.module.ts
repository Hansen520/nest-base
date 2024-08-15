/*
 * @Date: 2024-08-15 10:11:06
 * @Description: description
 */
import { Module } from '@nestjs/common';
import { GithubStrategy } from './auth.strategy';

@Module({
  providers: [GithubStrategy],
})
export class AuthModule {}
