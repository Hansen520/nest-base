/*
 * @Date: 2024-04-12 14:43:10
 * @Description: description
 */
import { In } from "typeorm";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    // console.log("Inserting a new user into the database...");
    // // const user = new User()
    // // user.id = 1;
    // // user.firstName = "aaa111"
    // // user.lastName = "bbb222"
    // // user.age = 29
    // await AppDataSource.manager.save(User, [
    //   { firstName: "ccc", lastName: "ccc", age: 21 },
    //   { firstName: "ddd", lastName: "ddd", age: 22 },
    //   { firstName: "eee", lastName: "eee", age: 23 },
    // ]);
    // // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...");
    // const users = await AppDataSource.manager.find(User);
    // console.log("Loaded users: ", users);

    // console.log("Here you can setup and run express / fastify / any other framework.");
    // const [users, count] = await AppDataSource.manager.findAndCount(User, {
    //   select: {
    //     firstName: true,
    //     age: true
    //   },
    //   where: {
    //     id: In([4, 8])
    //   },
    //   order: {
    //     age: 'ASC'
    //   }
    // });
    // console.log(users, count);

    // const users = await AppDataSource.manager.query('select * from user where age in(?, ?)', [21, 22])
    // console.log(users);

    /* 复杂写法 */
    // const queryBuilder = await AppDataSource.manager.createQueryBuilder();
    // const user = await queryBuilder.select('user').from(User, "user").where('user.age = :age', { age: 21 }).getOne();
    // console.log(user);
    await AppDataSource.manager.transaction(async (manager) => {
      await manager.save(User, {
        id: 4,
        firstName: "eee",
        lastName: "eee",
        age: 20,
      });
    });
  })
  .catch((error) => console.log(error));
