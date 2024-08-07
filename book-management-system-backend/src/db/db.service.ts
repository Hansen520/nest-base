/*
 * @Date: 2024-08-06 18:00:09
 * @Description: description
 */
import { Injectable, Inject } from '@nestjs/common';
import { DbModuleOptions } from './db.module';
import { access, readFile, writeFile } from 'fs/promises';

@Injectable()
export class DbService {
  // 这里就是注入option里的东西
  @Inject('OPTIONS')
  private options: DbModuleOptions;

  // 读写
  async read() {
    const filePath = this.options.path;

    try {
      await access(filePath);
    } catch (e) {
      return [];
    }

    const str = await readFile(filePath, {
      encoding: 'utf-8',
    });
    if (!str) {
      return [];
    }
    return JSON.parse(str);
  }
  async write(obj: Record<string, any>) {
    await writeFile(this.options.path, JSON.stringify(obj || []), {
      encoding: 'utf-8',
    });
  }
}
