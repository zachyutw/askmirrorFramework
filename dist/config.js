"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {};
var PORT = 5000;
config.logFileDir = _path.default.resolve(__dirname, 'logs');
config.logName = 'askmirrorServer.log';
config.errorLogName = 'error.log';
config.sessionSecret = 'qwer1234';
config.domain = 'localhost:' + PORT;
config.PORT = PORT;
var _default = config;
exports.default = _default;