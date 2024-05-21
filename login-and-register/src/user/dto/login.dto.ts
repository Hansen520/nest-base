import { IsNotEmpty } from 'class-validator';

/*
 * @Date: 2024-05-20 17:30:14
 * @Description: description
 */
export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
