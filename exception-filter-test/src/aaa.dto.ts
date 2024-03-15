/*
 * @Date: 2024-03-14 11:17:08
 * @Description: description
 */
import { IsEmail, IsNumber, IsNotEmpty } from 'class-validator';

export class AaaDto {
  @IsNotEmpty({ message: 'aaa不能为空' })
  @IsEmail({}, { message: 'aaa 不是邮箱格式' })
  aaa: string;

  @IsNumber({}, { message: 'bbb 必须为数字' })
  @IsNotEmpty({ message: 'bbb 不能为空' })
  bbb: number;
}
