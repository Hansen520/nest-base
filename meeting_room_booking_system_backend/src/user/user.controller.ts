import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, UnauthorizedException, ParseIntPipe, BadRequestException, DefaultValuePipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/udpate-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { EmailService } from 'src/email/email.service';
import { RedisService } from 'src/redis/redis.service';
import { LoginUserDto } from '././dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RequireLogin, UserInfo } from 'src/custom.decorator';
import { UserDetailVo } from './vo/user-info.vo';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { generateParseIntPipe } from 'src/utils';
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

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

    vo.accessToken = this.jwtService.sign({
      userId: vo.userInfo.id,
      username: vo.userInfo.username,
      roles: vo.userInfo.roles,
      permissions: vo.userInfo.permissions
    }, {
      expiresIn: this.configService.get('jwt_access_token_expires_time') || '30m'
    });

    vo.refreshToken = this.jwtService.sign({
      userId: vo.userInfo.id
    }, {
      expiresIn: this.configService.get('jwt_refresh_token_expres_time') || '7d'
    })

    return vo
  }

  @Post('admin/login')
  async adminLogin(@Body() loginUser: LoginUserDto) {
    // console.log(loginUser);
    const vo = await this.userService.login(loginUser, true);

    vo.accessToken = this.jwtService.sign({
      userId: vo.userInfo.id,
      username: vo.userInfo.username,
      roles: vo.userInfo.roles,
      permissions: vo.userInfo.permissions
    }, {
      expiresIn: this.configService.get('jwt_access_token_expires_time') || '30m'
    });

    vo.refreshToken = this.jwtService.sign({
      userId: vo.userInfo.id
    }, {
      expiresIn: this.configService.get('jwt_refresh_token_expres_time') || '7d'
    })

    return vo;
  }


  @Get('refresh')
  async refresh(@Query('refreshToken') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);

      const user = await this.userService.findUserById(data.userId, false);

      const access_token = this.jwtService.sign({
        userId: user.id,
        username: user.username,
        roles: user.roles,
        permissions: user.permissions
      }, {
        expiresIn: this.configService.get('jwt_access_token_expires_time') || '30m'
      });

      const refresh_token = this.jwtService.sign({
        userId: user.id
      }, {
        expiresIn: this.configService.get('jwt_refresh_token_expres_time') || '7d'
      });

      return {
        access_token,
        refresh_token
      }

    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }


  @Get('admin/refresh')
  async adminRefresh(@Query('refreshToken') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);

      const user = await this.userService.findUserById(data.userId, true);

      const access_token = this.jwtService.sign({
        userId: user.id,
        username: user.username,
        roles: user.roles,
        permissions: user.permissions
      }, {
        expiresIn: this.configService.get('jwt_access_token_expires_time') || '30m'
      });

      const refresh_token = this.jwtService.sign({
        userId: user.id
      }, {
        expiresIn: this.configService.get('jwt_refresh_token_expres_time') || '7d'
      });

      return {
        access_token,
        refresh_token
      }
    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }


  @Get('info')
  @RequireLogin()
  async info(@UserInfo('userId') userId: number) {

    const user = await this.userService.findUserDetailById(userId);

    const vo = new UserDetailVo();

    vo.id = user!.id;
    vo.email = user!.email;
    vo.username = user!.username;
    vo.headPic = user!.headPic;
    vo.phoneNumber = user!.phoneNumber;
    vo.nickName = user!.nickName;
    vo.createTime = user!.createTime;
    vo.isFrozen = user!.isFrozen;

    return vo;

  }

  // 更改密码
  @Post(['update_password', 'admin/update_password'])
  @RequireLogin()
  // UserInfo 里面有值，就拿到对应的值， Body拿到对应的参数
  async updatePassword(@UserInfo('userId') userId: number, @Body() passwordDto: UpdateUserPasswordDto) {
    // console.log(passwordDto);
    return await this.userService.updatePassword(userId, passwordDto);
  }


  // 更新数据用户数据
  @Post(['update', 'admin/update'])
  @RequireLogin()
  async update(@UserInfo('userId') userId: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(userId, updateUserDto);
  }

  // 冻结用户接口
  @Get('freeze')
  async freeze(@Query('id') userId: number) {
    await this.userService.freezeUserById(userId);
    return 'success';
  }

  @Get('list')
  async list(
    // 这边如 pageNo 传 的是字段， 然后默认的  DefaultValuePipe 为 1， generateParseIntPipe('pageNo') 这边主要是错误的话要报异常
    @Query('pageNo', new DefaultValuePipe(1), generateParseIntPipe('pageNo')) pageNo: number,
    @Query('pageSize', new DefaultValuePipe(1), generateParseIntPipe('pageSize')) pageSize: number,
    @Query('username') username: string,
    @Query('nickName') nickName: string,
    @Query('email') email: string
  ) {

    return await this.userService.findUsers(username, nickName, email, pageNo, pageSize);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }



}
