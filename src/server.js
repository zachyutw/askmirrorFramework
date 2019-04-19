import app from './app';
import fs from 'fs';
import spdy from 'spdy';
import config from '../config';
import logger from './logger/logger';
// import https from 'https';
import http from 'http';

const options = {
    key: fs.readFileSync(config.ROOT_DIRECTORY + '/cert/dev.askmirror.local.key'),
    cert: fs.readFileSync(config.ROOT_DIRECTORY + '/cert/dev.askmirror.local.crt')
};

const server = http.createServer(app);
server.listen(process.env.PORT, (error) => {
    if (error) {
        console.error(error);
        return process.exit(1);
    } else {
        logger.info('server started - ' + process.env.PORT);
    }
});

const serverHttps = spdy.createServer(options, app);
serverHttps.listen(process.env.SSL_PORT, (error) => {
    if (error) {
        console.error(error);
        return process.exit(1);
    } else {
        logger.info('https server started - ' + process.env.SSL_PORT);
    }
});
