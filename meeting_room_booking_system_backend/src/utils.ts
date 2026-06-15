import * as crypto from 'crypto';
import { ParseIntPipe, BadRequestException } from '@nestjs/common';

export function md5(str) {
    const hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex');
}

// 异常，发返回的一定要是数字
export function generateParseIntPipe(name) {
    return new ParseIntPipe({
      exceptionFactory() {
        throw new BadRequestException(name + ' 应该传数字');
      } 
    })
}
