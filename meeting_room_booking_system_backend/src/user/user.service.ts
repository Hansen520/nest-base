/**
 * 用户服务层
 *
 * @description 处理用户相关的业务逻辑，包括用户注册、登录、权限管理等
 */
import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { md5 } from 'src/utils';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RedisService } from 'src/redis/redis.service';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserVo } from './vo/login-user.vo';

/**
 * 用户服务
 *
 * @description 提供用户注册、登录、初始化等核心功能
 */
@Injectable()
export class UserService {

  private logger = new Logger();

  @Inject(RedisService)
  private redisService: RedisService;


  @InjectRepository(User)
  private userRepository: Repository<User>


  @InjectRepository(Role)
  private roleRepository: Repository<User>


  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>


  /**
   * 用户注册
   *
   * @description 验证邮箱验证码后创建新用户账号
   * @param user 注册用户信息（用户名、密码、邮箱、昵称、验证码）
   * @returns 注册结果
   * @throws 验证码已失效、验证码不正确、用户已存在等异常
   */
  async register(user: RegisterUserDto) {
    const captcha = await this.redisService.get(`captcha_${user.email}`);

    // 没有找到验证码
    if (!captcha) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }

    // 验证码不正确, 从regis里面取出来和用户输入的去做对比
    if (user.captcha !== captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }

    const foundUser = await this.userRepository.findOneBy({
      username: user.username
    });

    if (foundUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST)
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);
    newUser.email = user.email;
    newUser.nickName = user.nickName;

    try {
      await this.userRepository.save(newUser);
      return '注册成功！'
    } catch (e) {
      this.logger.error(e, UserService);
    }

  }

  /**
   * 初始化测试数据
   *
   * @description 创建两个测试用户（张三、李四）及其关联的角色和权限，用于开发和测试
   */
  async initData() {
    const user1 = new User();
    user1.username = "zhangsan";
    user1.password = md5("111111");
    user1.email = "xxx@xx.com";
    user1.isAdmin = true;
    user1.nickName = '张三';
    user1.phoneNumber = '13233323333';

    const user2 = new User();
    user2.username = 'lisi';
    user2.password = md5("222222");
    user2.email = "yy@yy.com";
    user2.nickName = '李四';

    const role1 = new Role();
    role1.name = '管理员';

    const role2 = new Role();
    role2.name = '普通用户';

    const permission1 = new Permission();
    permission1.code = 'ccc';
    permission1.description = '访问 ccc 接口';

    const permission2 = new Permission();
    permission2.code = 'ddd';
    permission2.description = '访问 ddd 接口';

    user1.roles = [role1];
    user2.roles = [role2];

    role1.permissions = [permission1, permission2];
    role2.permissions = [permission1];

    await this.permissionRepository.save([permission1, permission2]);
    await this.roleRepository.save([role1, role2]);
    await this.userRepository.save([user1, user2]);
  }

  /**
   * 用户登录
   *
   * @description 验证用户名和密码，返回用户信息及权限列表
   * @param loginUserDto 登录信息（用户名、密码）
   * @param isAdmin 是否管理员登录
   * @returns 登录成功后的用户信息（包含角色和权限）
   * @throws 用户不存在、密码错误等异常
   */
  async login(loginUserDto: LoginUserDto, isAdmin: boolean) {
    const user = await this.userRepository.findOne({
      where: {
        username: loginUserDto.username,
        isAdmin // 可以用isAdmin 去判断是否为管理员
      },
      /**
       * 关联预加载配置
       * - 'roles': 同时加载用户的角色列表
       * - 'roles.permissions': 加载角色时嵌套加载每个角色的权限列表
       * 这样可以用一次查询获取用户、角色、权限的完整嵌套结构，避免 N+1 查询
       */
      relations: ['roles', 'roles.permissions']
    });

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    if (user.password !== md5(loginUserDto.password)) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }

    console.log(user, 168);

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
      roles: user.roles.map(item => item.name),
      permissions: user.roles.reduce((arr: any, item) => {
        item.permissions.forEach((permission) => {
          if (arr.indexOf(permission) === -1) {
            arr.push(permission);
          }
        })
        return arr;
      }, [])
    }

    return vo;
  }


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new email';
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}