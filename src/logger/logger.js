const winston = require('winston');
const fs = require('fs');

const LOG_NAME = 'infoLog';
const LOG_FILE_DIR = 'logs';
const ERROR_LOG_NAME = 'errorLog';

const dir = LOG_FILE_DIR;
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

let logger = new winston.createLogger({
    format: winston.format.combine(winston.format.label({ label: 'AskMirror:' }), winston.format.timestamp(), winston.format.prettyPrint(), winston.format.json()),
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

module.exports = logger;
