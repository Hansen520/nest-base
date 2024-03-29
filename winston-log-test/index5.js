/*
 * @Date: 2024-03-28 11:21:15
 * @Description: description
 */
import winston from 'winston';

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console()
    ],
    rejectionHandlers: [
        new winston.transports.File({
            filename: 'rejection.log'
        })
    ]
});

(async function(){
    throw Error('yyy');
})();

logger.info('光光光光光光光光光');
logger.error('东东东东东东东东');
logger.debug(66666666);