'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.default = void 0;

var winston = _interopRequireWildcard(require('winston'));

var rotate = _interopRequireWildcard(require('winston-daily-rotate-file'));

var _config = _interopRequireDefault(require('../config'));

var fs = _interopRequireWildcard(require('fs'));

function _interopRequireDefault (obj){
    return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard (obj){
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc =
                        Object.defineProperty && Object.getOwnPropertyDescriptor
                            ? Object.getOwnPropertyDescriptor(obj, key)
                            : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}

var LOG_NAME = _config.default.LOG_NAME,
    LOG_FILE_DIR = _config.default.LOG_FILE_DIR,
    ERROR_LOG_NAME = _config.default.ERROR_LOG_NAME;
var dir = _config.default.LOG_FILE_DIR;

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

var logger = new winston.createLogger({
    format: winston.format.combine(
        winston.format.label({
            label: 'AskMirror:'
        }),
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
            dirname: LOG_FILE_DIR,
            filename: ERROR_LOG_NAME,
            json: true
        }),
        new winston.transports.File({
            level: 'info',
            json: true,
            filename: LOG_NAME,
            dirname: LOG_FILE_DIR,
            maxsize: 20971520,
            //20MB
            maxFiles: 25
        })
    ],
    exitOnError: false
});
logger.stream = {
    write: function write (message, encoding){
        logger.info(message);
    }
};
var _default = logger;
exports.default = _default;
