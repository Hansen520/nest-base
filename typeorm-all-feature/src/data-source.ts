/*
 * @Date: 2024-04-12 14:43:10
 * @Description: description
 */
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Aaa } from "./entity/Aaa"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "118.195.176.186",
    port: 28002,
    username: "root",
    password: "325600",
    database: "practice",
    synchronize: true,
    logging: true,
    entities: [User, Aaa],
    migrations: [],
    subscribers: [],
    poolSize: 10,
    connectorPackage: 'mysql2',
    extra: {
        authPlugin: 'sha256_password',
    }
})
