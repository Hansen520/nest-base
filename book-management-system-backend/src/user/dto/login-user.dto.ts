import { IsNotEmpty, MinLength } from 'class-validator';

/*
 * @Date: 2024-08-06 17:46:41
 * @Description: description
 */
export class LoginUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码长度不能小于6位' })
  password: string;
}
