# 一份简单的总结

## 基本的结构

controller 是写路由管理的

module 将所有的都收集起来(收集controller、service等等)

service 写一些服务的信息

## AOP 面向切面编程

### 中间件 Middleware

中间件是 Express 里的概念，Nest 的底层是 Express，所以自然也可以使用中间件，但是做了进一步的细分，分为了全局中间件和路由中间件。

```typescript
app.use(function(req: Request, res:Response, next: NextFunction) {
    console.log('Time:before', req.url, Date.now());
    next();
    console.log('Time:after', Date.now());
});
```

```typescript
@Get()
getHello(): string {
    console.log('header....');
    return this.appService.getHello();
}
```



### Guard

Guard 是路由守卫的意思，可以用于在调用某个 Controller 之前判断权限，返回 true 或者 false 来决定是否放行：

```typescript
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('login check')
    return false;
  }
}

```

```typescript
// 访问aaa是没有权限的
@Get('aaa')
  @UseGuards(LoginGuard)
  aaa(): string {
    console.log('aaa...');
    return 'aaa';
  }
```

### Interceptor

Interceptor 是拦截器的意思，可以在目标 Controller 方法前后加入一些逻辑

```typescript
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        console.log('time: ', Date.now() - startTime)
      })
    );
  }
}
```

```typescript
@Get('bbb')
  @UseInterceptors(TimeInterceptor)
  bbb(): string {
    console.log('bbb...');
    return 'bbb';
  }
```

interceptor 可以拿到调用的 controller 和 handler

### Pipe 

Pipe 是管道的意思，用来对参数做一些检验和转换：

Pipe 是在参数传给 contriller（handler） 之前对参数做一些验证和转换

- ValidationPipe
- ParseIntPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- DefaultValuePipe
- ParseEnumPipe
- ParseFloatPipe
- ParseFilePipe

```typescript
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    if(Number.isNaN(parseInt(value))) {
      throw new BadRequestException(`参数${metadata.data}错误`)
    }

    return typeof value === 'number' ? value * 10 : parseInt(value) * 10;
  }
}
```

```typescript
@Get('ccc')
  @UseFilters(TestFilter)
  ccc(@Query('num', ValidatePipe) num: number) {
    return num + 1;
  }
```

### ExceptionFilter

其实我们刚刚在 pipe 里抛的这个错误，能够返回 400 的响应，就是 Exception Filter 做的：

```typescript
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class TestFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();

    response.status(400).json({
      statusCode: 400,
      message: 'test:' + exception.message,
    });
  }
}

```

```typescript
@Get('ccc')
@UseFilters(TestFilter)
ccc(@Query('num', ValidatePipe) num: number) {
    return num + 1;
}
```

异常类 Nest 内置了很多 http 相关的异常，都是 HttpException 的子类

- BadRequestException
- UnauthorizedException
- NotFoundException
- ForbiddenException
- NotAcceptableException
- RequestTimeoutException
- ConflictException
- GoneException
- PayloadTooLargeException
- UnsupportedMediaTypeException
- UnprocessableException
- InternalServerErrorException
- NotImplementedException
- BadGatewayException
- ServiceUnavailableException
- GatewayTimeoutException

## 装饰器

- 类装饰器：类装饰器用于装饰类，它接受一个 target 参数；target 参数表示被装饰的类的构造函数，在类装饰器中，可以通过修改这个参数来扩展或修改类本身。
- 方法装饰器：方法装饰器用于装饰类的方法，它接受三个参数：target 、methodName 、descriptor；target 参数如果装饰的是静态方法，那么target就是类的构造函数；如果装饰的是实例方法，那么target就是类的原型对象；methodName 参数表示被装饰的方法的名称；descriptor参数表示被装饰的方法的属性描述符（PropertyDescriptor）。可以通过修改这个参数来扩展或修改方法的行为。
- 访问器装饰器：访问器装饰器用于装饰类的访问器（getter和setter），它接受三个参数：target 、propertyName 、descriptor ；target参数如果装饰的是静态访问器，那么target就是类的构造函数；如果装饰的是实例访问器，那么target就是类的原型对象；propertyName参数表示被装饰的访问器的名称；descriptor参数表示被装饰的访问器的属性描述符（PropertyDescriptor）。可以通过修改这个参数来扩展或修改访问器的行为。
- 属性装饰器：属性装饰器用于装饰类的属性，它接受两个参数：target 、propertyName ；target参数如果装饰的是静态属性，那么target就是类的构造函数；如果装饰的是实例属性，那么target就是类的原型对象 ；propertyName参数表示被装饰的属性的名称。
- 参数装饰器：参数装饰器用于装饰函数或方法的参数，它接受三个参数：target 、methodName 、parameterIndex ；target参数如果装饰的是静态方法，那么target就是类的构造函数；如果装饰的是实例方法，那么target就是类的原型对象；methodName参数表示被装饰的方法的名称；parameterIndex参数表示被装饰的参数在方法参数列表中的索引。

- @Module： 声明 Nest 模块
- @Controller：声明模块里的 controller
- @Injectable：声明模块里可以注入的 provider
- @Inject：通过 token 手动指定注入的 provider，token 可以是 class 或者 string
- @Optional：声明注入的 provider 是可选的，可以为空
- @Global：声明全局模块
- @Catch：声明 exception filter 处理的 exception 类型
- @UseFilters：路由级别使用 exception filter
- @UsePipes：路由级别使用 pipe
- @UseInterceptors：路由级别使用 interceptor
- @SetMetadata：在 class 或者 handler 上添加 metadata
- @Get、@Post、@Put、@Delete、@Patch、@Options、@Head：声明 get、post、put、delete、patch、options、head 的请求方式
- @Param：取出 url 中的参数，比如 /aaa/:id 中的 id
- @Query: 取出 query 部分的参数，比如 /aaa?name=xx 中的 name
- @Body：取出请求 body，通过 dto class 来接收
- @Headers：取出某个或全部请求头
- @Session：取出 session 对象，需要启用 express-session 中间件
- @HostParm： 取出 host 里的参数
- @Req、@Request：注入 request 对象
- @Res、@Response：注入 response 对象，一旦注入了这个 Nest 就不会把返回值作为响应了，除非指定 passthrough 为true
- @Next：注入调用下一个 handler 的 next 方法
- @HttpCode： 修改响应的状态码
- @Header：修改响应头
- @Redirect：指定重定向的 url
- @Render：指定渲染用的模版引擎

### 自定义装饰器

class的装饰器

```typescript
// 自定义装饰器(注解)
export const Ddd = (path, metadata) => {
  return applyDecorators(Controller(path), SetMetadata('ddd', metadata));
};

```

```typescript
@Ddd('eee', 'han_Love')
export class AppController {...
```

方法的装饰器

```typescript
import { SetMetadata } from '@nestjs/common';

export const Aaa = (...args: string[]) => SetMetadata('aaa', args);
```



```typescript
@Aaa('admin')
getHello2(): string {
    return this.appService.getHello();
}
```

## Module 和 Provider 的循环依赖

Module 之间可以相互 imports，Provider 之间可以相互注入，这两者都会形成循环依赖。

解决方式就是两边都用 forwardRef 来包裹下。

- module

```typescript
import { Module, forwardRef } from '@nestjs/common';
import { BbbModule } from 'src/bbb/bbb.module';

@Module({
  imports: [forwardRef(() => BbbModule)],
})
export class AaaModule {}

```

```typescript
import { Module, forwardRef } from '@nestjs/common';
import { AaaModule } from 'src/aaa/aaa.module';

@Module({
  imports: [forwardRef(() => AaaModule)],
})
export class BbbModule {}

```

```typescript
@Module({
  imports: [AaaModule, BbbModule],
  controllers: [AppController],
  providers: [AppService, CccService, DddService],
})
export class AppModule {}
```

- service

```typescript
@Injectable()
export class CccService {
  constructor(
    @Inject(forwardRef(() => DddService)) private dddService: DddService,
  ) {}
  ccc() {
    return 'ccc';
  }
  eee() {
    return this.dddService.ddd() + 'eee';
  }
}
```

```typescript
@Injectable()
export class DddService {
  constructor(
    @Inject(forwardRef(() => CccService)) private cccService: CccService,
  ) {}

  ddd() {
    return this.cccService.ccc() + 'ddd';
  }
}

```

```typescript
@Injectable()
export class AppService {
    constructor(private cccService: CccService, private dddService: DddService) {}
    getHello(): string {
        return this.dddService.ddd() + this.cccService.eee();
    }
}
```

## 35 OSS 文件上传
## 76、79、80 learned

79 - 80，学习了nginx相关的知识，nginx的location的4种匹配方法，以及 优先级是 **精确匹配（=） > 高优先级前缀匹配（^~） > 正则匹配（～ ~*） > 普通前缀匹配**

nginx 还可以对动态资源做反向代理。nginx 反向代理可以修改请求、响应信息，比如设置 header。当有多台应用服务器的时候，可以通过 upstream 配置负载均衡，有 4 种策略：**轮询、带权重的轮询、ip_hash、fair**。


流量染色：可以配置不同的版本的比例，然后流量经过这个系统之后，就会返回 Set-Cookie 的 header，里面按照比例来分别设置不同的 cookie。比如随机数载 0 到 0.2 之间，就设置 version=2.0 的 cookie，否则，设置 version=1.0 的 cookie。

灰度功能：可以用来做 5% 10% 50% 100% 这样逐步上线的灰度上线机制，也可以用来做产品 AB 实验。nginx首先通过流量染色，来返回不同的cookie，然后下次访问时，会根据cookie来判断该使用哪个版本，我们可以在这一层根据 cookie 里的 version 字段来决定转发请求到哪个服务。

## 81 nest new redis-session-test -p npm 分布式session
这里分布式session共享，是指redis 服务是单独启动的，然后其他的服务器访问，通过接口调用 redis 的服务实现 分布式的 session 共享

## 82 Redis 实现充电宝
redis 是 key-value 的数据库，value 有很多种类型：

string： 可以存数字、字符串，比如存验证码就是这种类型
hash：存一个 map 的结构，比如文章的点赞数、收藏数、阅读量，就可以用 hash 存
set：存去重后的集合数据，支持交集、并集等计算，常用来实现关注关系，比如可以用交集取出互相关注的用户
zset：排序的集合，可以指定一个分数，按照分数排序。我们每天看的文章热榜、微博热榜等各种排行榜，都是 zset 做的
list：存列表数据
geo：存地理位置，支持地理位置之间的距离计算、按照半径搜索附近的位置

这些都是基于 redis 实现的，因为 redis 有 geo 的数据结构，可以方便的计算两点的距离，计算某个半径内的点。

## 83 Swagger自动生成api文档
文档项目暂时不弄

## 86 序列化 Entity，你不需要 VO 对象
后端系统中常见 entity、vo、dto 三种对象，vo 是用来封装**返回的响应数据**的。

entity 里加上 @Exclude 可以排除某些字段、@Expose 可以增加一些派生字段、@Transform 可以对已有字段的序列化结果做修改。

然后在 cotnroller 上加上 ClassSerializerInterceptor 的 interceptor，还可以用 @SerializeOptions 来添加 options。

Nest 文档里并没有提到 vo 对象，因为完全没有必要，可以直接用序列化的 entity。

## 87 88 暂时没看

# 90 基于邮箱验证码登录
综合用到了 mysql、redis、typeorm、nodemailer 等技术。

并且使用 @nestjs/config 包的 ConfigModule 来封装配置。

要注意的是，如果用了 .env 文件，需要保证它在 src 下，并且要在 nest-cli.json 里配置 assets 和 watchAssets，不然 build 的时候不会复制到 dist 下。

# 91 redis 记录阅读数
CREATE DATABASE article_views DEFAULT CHARACTER SET utf8mb4; // 这个事是数据库创建