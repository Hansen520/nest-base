/*
 * @Date: 2024-03-05 17:58:28
 * @Description: description
 */
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (Number.isNaN(parseInt(value))) {
      throw new BadRequestException(`参数${metadata.data}只能是数字`);
    }
    return typeof value === 'number' ? value * 10 : parseInt(value) * 10;
  }
}
