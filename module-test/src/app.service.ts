/*
 * @Date: 2024-03-08 15:36:13
 * @Description: description
 */
import { Injectable } from '@nestjs/common';
import { CccService } from './ccc.service';
import { DddService } from './ddd.service';

@Injectable()
export class AppService {
  constructor(private cccService: CccService, private dddService: DddService) {}
  getHello(): string {
    return this.dddService.ddd() + this.cccService.eee();
  }
}
