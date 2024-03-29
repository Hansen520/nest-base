import winston from "winston";
import "winston-daily-rotate-file";

const console = new winston.transports.Console();
const file = new winston.transports.File({ filename: "test.log" });
const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({
    //   dirname: "log",
    //   filename: "test.log",
    //   maxsize: 1024,
    // }),
    // new winston.transports.DailyRotateFile({
    //     level: 'info',
    //     dirname: 'log2',
    //     filename: 'test-%DATE%.log',
    //     datePattern: 'YYYY-MM-DD-HH-mm',
    //     maxSize: '1k'
    // })
    // new winston.transports.Http({
    //     host: 'localhost',
    //     port: '3000',
    //     path: '/log',
    // })
  ],
});

// logger.clear();
// logger.add(console);
// logger.remove(console);
// logger.add(file);

// logger.info("hhhhhhhhhhhhhhhh");
// logger.error("sssssssssssssssss");
// logger.debug("dddddddddddddddd");
