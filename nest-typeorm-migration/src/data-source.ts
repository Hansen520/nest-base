/*
 * @Date: 2024-08-15 14:33:05
 * @Description: database
 */
import { DataSource } from 'typeorm';
import { Article } from './article/entities/article.entity';
import { config } from 'dotenv';

export default new DataSource({
  type: 'mysql',
  host: `${process.env.mysql_server_host}`,
  port: +`${process.env.mysql_server_port}`,
  username: `${process.env.mysql_server_username}`,
  password: `${process.env.mysql_server_password}`,
  database: `${process.env.mysql_server_database}`,
  synchronize: false, // 设置下才会自动建表
  logging: true,
  entities: [Article],
  migrations: ['src/migrations/**.ts'],
  subscribers: [],
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: {
    authPlugin: 'sha256_password',
  },
});
