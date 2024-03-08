/*
 * @Date: 2024-03-08 15:48:37
 * @Description: description
 */
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CccService } from './ccc.service';

@Injectable()
export class DddService {
  constructor(
    @Inject(forwardRef(() => CccService)) private cccService: CccService,
  ) {}

  ddd() {
    return this.cccService.ccc() + 'ddd';
  }
}
