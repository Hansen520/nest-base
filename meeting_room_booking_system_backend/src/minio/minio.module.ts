import { Global, Module } from '@nestjs/common';
import * as Minio from 'minio';
import { ConfigService } from '@nestjs/config';
import { MinioController } from './minio.controller';


// 这是一个对象文件存储的工具地址9000
@Global()
@Module({
    providers: [
        {
            provide: 'MINIO_CLIENT',
            async useFactory(configService: ConfigService) {
                const client = new Minio.Client({
                    endPoint: configService.get<string>('minio_endpoint')!,
                    port: +configService.get<number>('minio_port')!,
                    useSSL: false,
                    accessKey: configService.get<string>('minio_access_key')!,
                    secretKey: configService.get<string>('minio_secret_key')!
                })
                return client;
            },
            inject: [ConfigService]
        }
    ],
    exports: ['MINIO_CLIENT'],
    controllers: [MinioController]
})
export class MinioModule { }
