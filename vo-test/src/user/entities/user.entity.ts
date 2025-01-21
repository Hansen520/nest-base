import { Exclude, Expose, Transform } from 'class-transformer';

/*
 * @Date: 2025-02-19 14:13:08
 * @Description: description
 */
export class User {
  id: number;

  username: string;

  @Exclude()
  password: string;

  @Expose() // @Expose 是添加一个导出的字段，这个字段是只读的。
  get xxx(): string {
    return `${this.username} ${this.email}`;
  }

  // @Transform 是对返回的字段值做一些转换
  @Transform(({ value }) => '邮箱是：' + value)
  email: string;

  // 构造函数，接收一个部分User对象作为参数
  constructor(partial: Partial<User>) {
    // 将部分User对象中的属性赋值给当前对象
    Object.assign(this, partial);
  }
}
