import { WinstonLogger } from 'nest-winston';
import { Logger, QueryRunner } from 'typeorm';

/**
 * TypeORM 日志适配器。
 *
 * TypeORM 产生的数据库日志统一交给 Nest 应用中的 WinstonLogger，
 * 这样 SQL 日志可以和应用日志使用相同的输出配置与格式。
 */
export class CustomTypeOrmLogger implements Logger {

    /** 保存应用级 Winston 日志实例，供各个日志回调使用。 */
    constructor(private winstonLogger: WinstonLogger) {

    }

    /** 记录 TypeORM 的普通运行日志。 */
    log(level: 'log' | 'info' | 'warn', message: any) {
        this.winstonLogger.log(message);
    }

    /** 记录执行的 SQL 语句及其参数。 */
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.winstonLogger.log({
            sql: query,
            parameters
        });
    }

    /** 记录 SQL 执行失败时的语句和参数。 */
    logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.winstonLogger.error({
            sql: query,
            parameters
        });
    }

    /** 记录超过 TypeORM 慢查询阈值的 SQL 及执行耗时（毫秒）。 */
    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        this.winstonLogger.log({
            sql: query,
            parameters,
            time
        });
    }

    /** 记录 TypeORM 创建或更新数据库结构时的日志。 */
    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        this.winstonLogger.log(message);
    }

    /** 记录数据库迁移执行过程中的日志。 */
    logMigration(message: string, queryRunner?: QueryRunner) {
        this.winstonLogger.log(message);
    }

}
