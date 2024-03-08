/*
 * @Date: 2024-03-08 15:48:31
 * @Description: description
 */
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { DddService } from './ddd.service';

@Injectable()
export class CccService {
  constructor(
    @Inject(forwardRef(() => DddService)) private dddService: DddService,
  ) {}
  ccc() {
    return 'ccc';
  }
  eee() {
    return this.dddService.ddd() + 'eee';
  }
}
