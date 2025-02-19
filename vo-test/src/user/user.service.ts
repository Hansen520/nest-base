/*
 * @Date: 2025-02-19 14:13:08
 * @Description: description
 */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserVo } from './vo/user.vo';

const database = [];
let id = 0;

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    user.id = id++;

    database.push(user);
    return user;
  }

  findAll() {
    return database;
    // return database.map((item) => {
    //   // 这里好像是把password给去掉了，所以返回的userVo没有password
    //   return new UserVo({
    //     id: item.id,
    //     username: item.username,
    //     email: item.email,
    //   });
    // });
  }

  findOne(id: number) {
    return (
      database
        .filter((item) => item.id === id)
        // .map((item) => {
        //   return new UserVo({
        //     id: item.id,
        //     username: item.username,
        //     email: item.email,
        //   });
        // })
        .at(0)
    );
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
