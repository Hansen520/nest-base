import { IsNotEmpty, Length } from 'class-validator';

/*
 * @Date: 2024-06-06 11:03:24
 * @Description: description
 */
export class UserLoginDto {
  // 用户名
  @IsNotEmpty()
  @Length(1, 50)
  username: string;

  // 密码
  @IsNotEmpty()
  @Length(1, 50)
  password: string;
}
