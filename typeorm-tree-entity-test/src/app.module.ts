/*
 * @Date: 2024-05-14 15:15:12
 * @Description: description
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './city/entities/city.entity';

@Module({
  imports: [
    CityModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '118.195.176.186',
      port: 28002,
      username: 'root',
      password: '325600',
      database: 'tree_test',
      synchronize: true,
      logging: true,
      entities: [City],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
