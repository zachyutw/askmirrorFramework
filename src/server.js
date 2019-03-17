import app from './app';
import fs from 'fs';
import spdy from 'spdy';
import config from '../config';
import logger from './logger/logger';
import https from 'https';
import http from 'http';

const options = {
    key: fs.readFileSync(config.rootDirectory + '/cert/dev.askmirror.local.key'),
    cert: fs.readFileSync(config.rootDirectory + '/cert/dev.askmirror.local.crt')
};

const server = http.createServer(app);
server.listen(config.PORT, () => {
    logger.info('server started - ' + config.domain);
});

const serverHttps = spdy.createServer(options, app).listen(config.SSL_PORT, (error) => {
    if (error) {
        console.error(error);
        return process.exit(1);
    } else {
        logger.info('https server started - ' + config.sslDomain);
    }
});
