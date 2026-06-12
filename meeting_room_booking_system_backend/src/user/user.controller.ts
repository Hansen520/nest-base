import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { EmailService } from 'src/email/email.service';
import { RedisService } from 'src/redis/redis.service';
import { LoginUserDto } from '././dto/login-user.dto';
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(RedisService)
  private redisService: RedisService;

  @Get('register-captcha')
  async captcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 8);

    const date = new Date();

    await this.redisService.set(`captcha_${address}`, code, 5000 * 60);

    await this.emailService.sendMail({
      to: address,
      subject: '注册验证码',
      html: `<p>你的注册验证码是${code}</p>, ${date.getFullYear()}, ${date.getMonth() + 1}, ${date.getDate()} ,星期${date.getDay()}`
    })
    return '发送成功';
  }

  @Get("init-data") 
  async initData() {
      await this.userService.initData();
      return 'done 数据初始化成功了';
  }


  @Post('register')
  // registerUser DTO 为外部请求过来的参数
  async register(@Body() registerUser: RegisterUserDto) {
    console.log(registerUser);
    return await this.userService.register(registerUser);
  }

  @Post('login')
  async userLogin(@Body() loginUser: LoginUserDto) {
    // console.log(loginUser);
    const vo = await this.userService.login(loginUser, false);
    return vo
  }

  @Post('admin/login')
  async adminLogin(@Body() loginUser: LoginUserDto) {
    // console.log(loginUser);
    const vo = await this.userService.login(loginUser, true);
    return vo;
  }


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }


  
}
