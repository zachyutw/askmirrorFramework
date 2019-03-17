import app from './app';
import config from '../config';
import logger from './logger/logger';
import https from 'https';
import http from 'http';
const server = http.createServer(app);
server.listen(config.PORT, () => {
    logger.info('server started - ' + config.domain);
});
