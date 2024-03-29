/*
 * @Date: 2024-03-28 11:18:16
 * @Description: description
 */
import winston from 'winston';

const logger = winston.createLogger({
    level: 'debug',
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({ 
            dirname: 'log3',
            filename: 'test.log',
            format: winston.format.json()
        }),
    ]
});

logger.info('光光光光光光光光光');
logger.error('东东东东东东东东');
logger.debug(66666666);