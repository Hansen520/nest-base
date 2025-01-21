/*
 * @Date: 2025-01-21 17:21:16
 * @Description: description
 */
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateAaaDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsBoolean()
  sex: boolean;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  hoobies: string[];
}
