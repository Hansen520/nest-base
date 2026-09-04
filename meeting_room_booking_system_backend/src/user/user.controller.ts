/**
 * 用户控制器：负责用户注册、登录认证、个人信息维护、用户查询及头像上传等接口。
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, UnauthorizedException, ParseIntPipe, BadRequestException, DefaultValuePipe, HttpStatus, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
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
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RefreshTokenVo } from './vo/refresh-token.vo';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import path from 'path';
import { storage } from 'src/my-file-storage';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserVo } from './vo/login-user.vo';


@ApiTags('用户管理模块')
@Controller('user')
/** 用户相关 HTTP 接口的统一入口，基础路由为 `/user`。 */
export class UserController {

  /** 用户业务服务，负责实际的数据读写和业务规则处理。 */
  constructor(private readonly userService: UserService) { }

  /** 邮件服务：发送注册和修改密码验证码。 */
  @Inject(EmailService)
  private emailService: EmailService;

  /** Redis 服务：临时保存验证码及其有效期。 */
  @Inject(RedisService)
  private redisService: RedisService;

  /** JWT 服务：生成和校验访问令牌、刷新令牌。 */
  @Inject(JwtService)
  private jwtService: JwtService;

  /** 配置服务：读取不同类型令牌的过期时间。 */
  @Inject(ConfigService)
  private configService: ConfigService;

  /** 发送注册验证码，并将验证码短期保存到 Redis 供注册时校验。 */
  @ApiQuery({
    name: 'address',
    type: String,
    description: '邮箱地址',
    required: true,
    example: 'xxx@xx.com'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '发送成功',
    type: String
  })
  @Get('register-captcha')
  async captcha(@Query('address') address: string) {
    // 验证码仅由服务端生成，客户端只需要提供接收验证码的邮箱地址。
    const code = Math.random().toString().slice(2, 8);

    const date = new Date();

    await this.redisService.set(`captcha_${address}`, code, 5000 * 60);

    await this.emailService.sendMail({
      to: address,
      subject: '注册验证码',
      html: `<p>你的注册验证码是${code}</p> ----- ${date.getFullYear()}, ${date.getMonth() + 1}, ${date.getDate()}, 星期${date.getDay()}`
    })
    return '发送成功';
  }

  /** 初始化用户基础数据，通常用于首次部署或开发环境准备。 */
  @Get("init-data")
  async initData() {
    await this.userService.initData();
    return 'done 数据初始化成功了';
  }


  /** 创建普通用户账号，注册参数由请求体中的 DTO 校验。 */
  @Post('register')
  // registerUser DTO 为外部请求过来的参数
  async register(@Body() registerUser: RegisterUserDto) {
    console.log(registerUser);
    return await this.userService.register(registerUser);
  }

  @ApiBody({
    type: LoginUserDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '用户不存在/密码错误',
    type: String
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '用户信息和token',
    type: LoginUserDto
  })
  // 使用 Passport 的 local 策略校验用户名和密码，校验失败时不会执行登录逻辑。
  @UseGuards(AuthGuard('local'))
  @Post('login')
  /** 普通用户登录，登录成功后签发访问令牌和刷新令牌。 */
  async userLogin(@Body() loginUser: LoginUserDto) {
    // console.log(loginUser);
    const vo = await this.userService.login(loginUser, false);

    // 访问令牌携带前端鉴权和权限判断所需的用户信息。
    vo.accessToken = this.jwtService.sign({
      userId: vo.userInfo.id,
      username: vo.userInfo.username,
      roles: vo.userInfo.roles,
      permissions: vo.userInfo.permissions
    }, {
      expiresIn: this.configService.get('jwt_access_token_expires_time') || '30m'
    });

    // 刷新令牌只保存用户 ID，降低令牌泄露后的信息暴露范围。
    vo.refreshToken = this.jwtService.sign({
      userId: vo.userInfo.id
    }, {
      expiresIn: this.configService.get('jwt_refresh_token_expres_time') || '7d'
    })

    return vo
  }

  /** 管理员登录；与普通登录流程相同，但只允许管理员账号通过校验。 */
  @Post('admin/login')
  async adminLogin(@Body() loginUser: LoginUserDto) {
    // console.log(loginUser);
    const vo = await this.userService.login(loginUser, true);

    // 管理员令牌与普通用户令牌使用同一套签发机制，但数据来源已按管理员身份校验。
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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() { }

  @Get('callback/google')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    if (!req.user) {
      throw new BadRequestException('google 登录失败');
    }
    const user = await this.userService.registerByGoogleInfo(
      req.user.email,
      req.user.firstName + ' ' + req.user.lastName,
      req.user.picture
    );

    const vo = new LoginUserVo();
    vo.userInfo = {
      id: user.id,
      username: user.username,
      nickName: user.nickName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      headPic: user.headPic,
      createTime: user.createTime.getTime(),
      isFrozen: user.isFrozen,
      isAdmin: user.isAdmin,
      roles: [],
      permissions: []
    }

    vo.accessToken = this.jwtService.sign({
      userId: vo.userInfo.id,
      username: vo.userInfo.username,
      email: vo.userInfo.email,
      roles: vo.userInfo.roles,
      permissions: vo.userInfo.permissions
    }, {
      expiresIn: this.configService.get('jwt_access_token_expires_time') || '30m'
    });

    vo.refreshToken = this.jwtService.sign({
      userId: vo.userInfo.id
    }, {
      expiresIn: this.configService.get('jwt_refresh_token_expres_time') || '7d'
    });

    return vo;
  }


  /** 使用普通用户刷新令牌重新签发访问令牌和刷新令牌。 */
  @ApiQuery({
    name: 'refreshToken',
    type: String,
    description: '刷新 token',
    required: true,
    example: 'xxxxxxxxyyyyyyyyzzzzz'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'token 已失效，请重新登录'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '刷新成功',
    type: RefreshTokenVo
  })
  @Get('refresh')
  async refresh(@Query('refreshToken') refreshToken: string) {
    try {
      // verify 会同时校验签名和有效期；任一失败都会进入统一异常处理。
      const data = this.jwtService.verify(refreshToken);

      const user = await this.userService.findUserById(data.userId, false);

      // 根据数据库中的最新角色和权限重新构造访问令牌，避免沿用旧权限。
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

      const vo = new RefreshTokenVo();

      vo.access_token = access_token;
      vo.refresh_token = refreshToken;

      return vo;

    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }


  /** 使用管理员刷新令牌重新签发管理员会话令牌。 */
  @Get('admin/refresh')
  async adminRefresh(@Query('refreshToken') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);

      const user = await this.userService.findUserById(data.userId, true);

      // 管理员刷新令牌同样重新读取用户信息，确保角色变更及时生效。
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


  /** 获取当前登录用户的详细资料，不直接返回数据库实体。 */
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    type: UserDetailVo
  })
  @Get('info')
  @RequireLogin()
  async info(@UserInfo('userId') userId: number) {

    const user = await this.userService.findUserDetailById(userId);

    // 使用 VO 明确控制返回字段，避免把数据库实体中的敏感字段直接暴露给客户端。
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

  /** 根据邮箱验证码更新用户密码。 */
  // 更改密码
  @ApiBody({
    type: UpdateUserPasswordDto
  })
  @ApiResponse({
    type: String,
    description: '验证码已失效/不正确'
  })
  @Post(['update_password', 'admin/update_password'])
  // UserInfo 里面有值，就拿到对应的值， Body拿到对应的参数
  async updatePassword(@Body() passwordDto: UpdateUserPasswordDto) {
    // console.log(passwordDto);
    return await this.userService.updatePassword(passwordDto);
  }


  /** 发送修改密码所需的邮箱验证码，并写入 Redis。 */
  @ApiQuery({
    name: 'address',
    description: '邮箱地址',
    type: String
  })
  @ApiResponse({
    type: String,
    description: '发送成功'
  })
  @Get('update_password/captcha')
  async updatePasswordCaptcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(`update_password_captcha_${address}`, code, 5000 * 60);

    await this.emailService.sendMail({
      to: address,
      subject: '更新密码验证码',
      html: `<p>你的更改密码验证码 ${code} </p>`
    })
    return '发送成功';
  }


  /** 更新当前登录用户的资料，也兼容管理员更新路由。 */
  // 更新数据用户数据
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateUserDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '验证码已失效/不正确'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '更新成功',
    type: String
  })
  @Post(['update', 'admin/update'])
  @RequireLogin()
  async update(@UserInfo('userId') userId: number, @Body() updateUserDto: UpdateUserDto) {
    // userId 来自已验证的登录上下文，客户端不能通过请求体修改其他用户资料。
    return await this.userService.update(userId, updateUserDto);
  }

  /** 冻结指定用户，使其无法继续使用系统。 */
  // 冻结用户接口
  @ApiBearerAuth()
  @ApiQuery({
    name: 'id',
    description: 'userId',
    type: Number
  })
  @ApiResponse({
    type: String,
    description: 'success'
  })
  @RequireLogin()
  @Get('freeze')
  async freeze(@Query('id') userId: number) {
    await this.userService.freezeUserById(userId);
    return 'success';
  }


  /** 按条件分页查询用户列表。分页参数缺省时使用默认值，并通过管道转换为数字。 */
  @ApiBearerAuth()
  @ApiQuery({
    name: 'pageNo',
    description: '第几页',
    type: Number
  })
  @ApiQuery({
    name: 'pageSize',
    description: '每页多少条',
    type: Number
  })
  @ApiQuery({
    name: 'username',
    description: '用户名',
    type: Number
  })
  @ApiQuery({
    name: 'nickName',
    description: '昵称',
    type: Number
  })
  @ApiQuery({
    name: 'email',
    description: '邮箱地址',
    type: Number
  })
  @ApiResponse({
    type: String,
    description: '用户列表'
  })
  @RequireLogin()
  @Get('list')
  async list(
    // 这边如 pageNo 传 的是字段， 然后默认的  DefaultValuePipe 为 1， generateParseIntPipe('pageNo') 这边主要是错误的话要报异常
    @Query('pageNo', new DefaultValuePipe(1), generateParseIntPipe('pageNo')) pageNo: number,
    @Query('pageSize', new DefaultValuePipe(1), generateParseIntPipe('pageSize')) pageSize: number,
    @Query('username') username: string,
    @Query('nickName') nickName: string,
    @Query('email') email: string
  ) {

    // 将筛选条件和分页信息交给 service 统一查询，控制器只负责参数接收和转换。
    return await this.userService.findUsers(username, nickName, email, pageNo, pageSize);
  }

  /** 上传用户头像，限制为图片类型且文件大小不超过 3 MB。 */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    dest: 'uploads',
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 3
    },
    fileFilter(req, file, callback) {
      // 通过扩展名限制上传格式，避免将非图片文件写入存储目录。
      const extname = path.extname(file.originalname);
      if (['.png', '.jpg', '.gif', '.svg'].includes(extname)) {
        callback(null, true);
      } else {
        callback(new BadRequestException('只能上传图片'), false);
      }
    }
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return file.path;
  }


  /** 创建用户记录的基础 CRUD 接口。 */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  /** 查询全部用户记录。 */
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /** 根据路径参数 id 查询单个用户。 */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  /** 根据路径参数 id 删除用户。 */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }



}
