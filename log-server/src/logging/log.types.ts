export const LOG_LEVELS = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];

export interface IncomingLog {
  level?: LogLevel | string;
  message?: string;
  [key: string]: unknown;
}

export interface LogResult {
  accepted: true;
  level: LogLevel;
  message: string;
}
