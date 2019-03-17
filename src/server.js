import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import passport from 'passport';
import logger from './logger/logger';
import morgan from 'morgan';
// import config from './core/config/config.dev';
import config from '../config';
// import connectToDb from './db/connect';
import path from 'path';
// import socketIo from './services/socketIo';
// import Passport from './services/passport';
// import combineRoutes from './routes/combineRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
// import { corsOptionsDelegate } from './services/cors.service';
import expressStaticGzip from 'express-static-gzip';
import compression from 'compression';
dotenv.config();
let oneYear = 1 * 365 * 24 * 60 * 60 * 1000;

//? generatro a path which always pooint to corrent root directoriy

const jwtSecrect = 'lasfu';
//* passport setup
// const port = config.PORT;

// connectToDb();
const app = express();
//* Node.js compression middleware.
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    morgan('combined', {
        stream: logger.stream,
        skip: function (req, res){
            return res.statusCode < 400;
        }
    })
);
app.use(
    cookieSession({
        name: 'session',
        //! d    hh    mm  ss
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        keys: [ config.sessionSecret ]
    })
);

// Passport();
app.use(passport.initialize());
app.use(passport.session());
// app.use(cors(corsOptionsDelegate));
// app.options('*', cors(corsOptionsDelegate));

// combineRoutes(app);

// const serverPathUrl = serverPath();

app.use('/', express.static(path.resolve(config.rootDirectory, 'client', 'build'), { maxAge: 60 * 60 * 3 }));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(config.rootDirectory, 'client', 'build', 'index.html'));
});
// app.use('/',expressStaticGzip(path.resolve(serverPathUrl, 'client', 'dist')));
// const sslOptions = {
//     key: fs.readFileSync('./cert/server.key'),
//     cert: fs.readFileSync('./cert/server.cer')
// };

// const server = https.createServer(sslOptions, app);

const server = http.createServer(app);
server.listen(config.PORT, () => {
    logger.info('server started - ' + config.domain);
});
