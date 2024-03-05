import { Injectable } from '@nestjs/common';
import { AaaService } from 'src/aaa/aaa.service';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';

@Injectable()
export class BbbService {
  /* aaaService是模块注入的产物 */
  constructor(private aaaService: AaaService) {}
  create(createBbbDto: CreateBbbDto) {
    return 'This action adds a new bbb1';
  }

  findAll() {
    return `This action returns all bbb1,` + this.aaaService.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} bbb2`;
  }

  update(id: number, updateBbbDto: UpdateBbbDto) {
    return `This action updates a #${id} bbb3`;
  }

  remove(id: number) {
    return `This action removes a #${id} bbb4`;
  }
}
