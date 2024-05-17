/*
 * @Date: 2024-05-14 16:19:12
 * @Description: description
 */
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: '118.195.176.186',
    port: 28002,
    username: 'root',
    password: '325600',
    database: 'migration_test',
    synchronize: false,
    logging: true,
    entities: [User],
    migrations: ['./src/migration/**.ts'],
    subscribers: [],
    poolSize: 10,
    connectorPackage: 'mysql2',
    extra: {
      authPlugin: 'sha256_password',
    },
  })
