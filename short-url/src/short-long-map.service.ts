import { UniqueCodeService } from './unique-code.service';
import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ShortLongMap } from './entities/ShortLongMap';
import { UniqueCode } from './entities/UniqueCode';

@Injectable()
export class ShortLongMapService {

    @InjectEntityManager()
    private entityManager: EntityManager;

    @Inject(UniqueCodeService)
    private uniqueCodeService: UniqueCodeService;

    // 通过短链拿到长链接
    async getLongUrl(code: string) {
        const map = await this.entityManager.findOneBy(ShortLongMap, {
            shortUrl: code
        });

        if (!map) {
            return null;
        }

        return map.longUrl;
    }

    async generate(longUrl: string) {
        let uniqueCode = await this.entityManager.findOneBy(UniqueCode, {
            status: 0
        });

        if (!uniqueCode) {
            const result = await this.uniqueCodeService.generateCode();
            if (!result) {
                throw new Error('Failed to generate unique code');
            }
            uniqueCode = result;
        }

        const code = uniqueCode!.code;
        const codeId = uniqueCode!.id;

        // 存入的字段
        const map = new ShortLongMap();
        map.shortUrl = code;
        map.longUrl = longUrl;

        await this.entityManager.insert(ShortLongMap, map);

        await this.entityManager.update(UniqueCode, {
            id: codeId
        }, {
            status: 1
        });
        return code;


    }



}