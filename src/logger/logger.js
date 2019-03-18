import * as winston from 'winston';
import config from '../../config';
import * as fs from 'fs';

const { logName, logFileDir, errorLogName } = config;
const dir = config.logFileDir;
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
            colorize: true
        }),
        new winston.transports.File({
            level: 'error',
            dirname: logFileDir,
            filename: errorLogName,
            json: true,
            maxsize: 20971520, //20MB
            maxFiles: 25
        }),
        new winston.transports.File({
            level: 'info',
            json: true,
            filename: logName,
            dirname: logFileDir,
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
