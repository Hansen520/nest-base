/*
 * @Date: 2024-08-13 09:50:16
 * @Description: description
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: '时间煮雨',
      password: 'time',
    },
    {
      userId: 2,
      username: '东东东',
      password: 'dong',
    },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
