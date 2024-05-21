import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

/*
 * @Date: 2024-05-20 17:30:25
 * @Description: description
 */
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  @Matches(/^[a-zA-Z0-9#$%_-]+$/, {
    message: '用户名只能是字母、数字或者 #、$、%、_、- 这些字符',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  password: string;
}
