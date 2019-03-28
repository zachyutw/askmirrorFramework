import * as winston from 'winston';
import config from '../../config';
import * as fs from 'fs';

const { LOG_NAME, LOG_FILE_DIR, ERROR_LOG_NAME } = config;
const dir = config.LOG_FILE_DIR;
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

let logger = new winston.createLogger({
    format: winston.format.combine(
        winston.format.label({ label: 'AskMirror:' }),
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            format: winston.format.simple(),
            colorize: true
        }),

        new winston.transports.File({
            level: 'error',
            dirname: LOG_FILE_DIR,
            filename: ERROR_LOG_NAME,
            json: true,
            maxsize: 20971520, //20MB
            maxFiles: 25
        }),
        new winston.transports.File({
            level: 'info',
            json: true,
            filename: LOG_NAME,
            dirname: LOG_FILE_DIR,
            maxsize: 20971520, //20MB
            maxFiles: 25
        })
    ],
    exitOnError: false
});
logger.stream = {
    write: function (message, encoding){
        logger.info(message);
    }
};

export default logger;
