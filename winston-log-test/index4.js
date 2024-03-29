/*
 * @Date: 2024-03-28 11:20:16
 * @Description: description
 */
import winston from 'winston';

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console()
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'error.log'
        })
    ]
});

throw new Error('xxx');

logger.info('光光光光光光光光光');
logger.error('东东东东东东东东');
logger.debug(66666666);