/*
 * @Date: 2024-03-14 18:09:59
 * @Description: description
 */
import { FileValidator } from '@nestjs/common';
import { Buffer } from 'buffer';

export class MyFileValidator extends FileValidator {
  constructor(options) {
    super(options);
  }

  isValid(file): boolean {
    console.log(file, 13);
    if (file.size > 10000) {
      return false;
    }
    return true;
  }

  buildErrorMessage(file: Express.Multer.File): string {
    return `文件 ${file.originalname} 大小超出 10k`;
  }
}
