import express from 'express';
import 'babel-polyfill';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import passport from 'passport';
import morgan from 'morgan';
import dbMongoose from './db/db.mongoose';
import path from 'path';
import errorHandler from './handlers/error.handler';
// import socketIo from './services/socketIo';
// import Passport from './services/passport';
import router from './routes/router';
import cors from 'cors';
import dotenv from 'dotenv';
import crosSecurity from './security/cors.security';
import expressStaticGzip from 'express-static-gzip';
import compression from 'compression';
import config from '../config';
import logger from './logger/logger';
dotenv.config();
let oneYear = 1 * 365 * 24 * 60 * 60 * 1000;

//? generatro a path which always pooint to corrent root directoriy

const jwtSecrect = 'lasfu';

//* passport setup
dbMongoose();
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
        keys: [ config.SESSION_SECRET ]
    })
);

// Passport();
app.use(passport.initialize());
app.use(passport.session());
app.use(crosSecurity);
app.options('*', crosSecurity);
router(app);
app.use(errorHandler);
app.use('/', express.static(path.resolve(config.ROOT_DIRECTORY, 'client', 'build'), { maxAge: 60 * 60 * 3 }));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(config.ROOT_DIRECTORY, 'client', 'build', 'index.html'));
});
// app.use('/',expressStaticGzip(path.resolve(serverPathUrl, 'client', 'dist')));
// const sslOptions = {
//     key: fs.readFileSync('./cert/server.key'),
//     cert: fs.readFileSync('./cert/server.cer')
// };

// const server = https.createServer(sslOptions, app);

export default app;
