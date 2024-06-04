/*
 * @Date: 2024-05-21 14:53:09
 * @Description: description
 */
import { IsNotEmpty, Length } from 'class-validator';
export class LoginUserDto {
  @IsNotEmpty()
  @Length(1, 50)
  username: string;

  @IsNotEmpty()
  @Length(1, 50)
  password: string;
}
