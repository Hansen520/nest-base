/*
 * @Date: 2025-01-21 17:21:16
 * @Description: description
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateAaaDto } from './create-aaa.dto';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateAaaDto extends PartialType(CreateAaaDto) {
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
