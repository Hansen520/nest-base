import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import winston, { format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { LOG_LEVELS } from './log.types';
import type { IncomingLog, LogLevel, LogResult } from './log.types';

@Injectable()
export class LoggingService implements OnModuleDestroy {
  private readonly logger: winston.Logger;

  constructor(private readonly configService: ConfigService) {
    const logDirectory = resolve(this.configService.get<string>('LOG_DIR', 'logs'));
    mkdirSync(logDirectory, { recursive: true });

    this.logger = winston.createLogger({
      level: this.configService.get<string>('LOG_LEVEL', 'info'),
      format: format.combine(format.timestamp(), format.errors({ stack: true }), format.json()),
      transports: [
        new transports.Console(),
        new DailyRotateFile({
          dirname: logDirectory,
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          maxSize: this.configService.get<string>('LOG_MAX_SIZE', '10k'),
          maxFiles: this.configService.get<string>('LOG_MAX_FILES', '14d'),
          zippedArchive: true,
        }),
      ],
    });
  }

  write(payload: IncomingLog): LogResult {
    const level = this.normalizeLevel(payload.level);
    const message = this.normalizeMessage(payload.message, payload);
    const metadata = { ...payload };
    delete metadata.level;
    delete metadata.message;

    this.logger.log(level, message, metadata);
    return { accepted: true, level, message };
  }

  onModuleDestroy(): void {
    this.logger.close();
  }

  private normalizeLevel(level: unknown): LogLevel {
    return typeof level === 'string' && LOG_LEVELS.includes(level as LogLevel)
      ? (level as LogLevel)
      : 'info';
  }

  private normalizeMessage(message: unknown, payload: IncomingLog): string {
    if (typeof message === 'string' && message.trim()) {
      return message;
    }
    return JSON.stringify(payload);
  }
}
