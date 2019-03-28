'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require('path'));

function _interopRequireDefault (obj){
    return obj && obj.__esModule ? obj : { default: obj };
}

var config = {};
var PORT = 5000;
config.LOG_FILE_DIR = _path.default.resolve(__dirname, 'logs');
config.LOG_NAME = 'askmirrorServer.log';
config.ERROR_LOG_NAME = 'error.log';
config.SESSION_SECRET = 'qwer1234';
config.domain = 'localhost:' + PORT;
config.PORT = PORT;
var _default = config;
exports.default = _default;
