const path = require('path');
let config = {};
/**
 * * 設定root 路徑 
 * * Config root path  
 */

config.ROOT_DIRECTORY = path.resolve(__dirname);
config.LOG_FILE_DIR = path.resolve(__dirname, 'logs');

module.exports = config;
