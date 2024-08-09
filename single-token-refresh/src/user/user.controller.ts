/*
 * @Date: 2024-08-09 14:09:19
 * @Description: description
 */
import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  jwtService: JwtService;

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    console.log(loginDto);
    if (loginDto.username !== 'han' || loginDto.password !== '123456') {
      return new BadRequestException('用户名或密码错误');
    }
    const jwt = this.jwtService.sign(
      {
        username: loginDto.username,
      },
      {
        secret: 'han',
        expiresIn: '7d',
      },
    );
    return jwt;
  }
}
