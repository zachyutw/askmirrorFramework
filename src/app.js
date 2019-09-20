const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const morgan = require('morgan');
const dbMongoose = require('./db/db.mongoose');
const path = require('path');
const errorHandler = require('./handlers/error.handler');
const { loadPassportStrategy } = require('./security/passport.strategy');
const router = require('./routes/router');
const dotenv = require('dotenv');
const crosSecurity = require('./security/cors.security');
const expressStaticGzip = require('express-static-gzip');
const compression = require('compression');
const config = require('../config');
const logger = require('./logger/logger');
const send = require('send');
const parseUrl = require('parseurl');

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
        keys: [ process.env.SESSION_SECRET ]
    })
);
loadPassportStrategy();
app.use(passport.initialize());
app.use(passport.session());
app.use(crosSecurity);
app.options('*', crosSecurity);
app.use((req, res, next) => {
    let sourceConnection = {};
    sourceConnection['user-agent'] = req.headers['user-agent'];
    sourceConnection['host'] = req.headers['host'];
    sourceConnection['ip'] = req.headers['x-real-ip'] || req.connection['remoteAddress'];
    sourceConnection['x-forwarded-for'] = req.headers['x-forwarded-for'];
    req.sourceConnection = sourceConnection;
    next();
});

app.use('/api/*', (req, res, next) => {
    logger.info({
        message: 'API Request',
        originalUrl: req.originalUrl,
        method: req.method,
        source: req.sourceConnection
    });
    next();
});
router(app);

app.use(errorHandler);
// app.use('/static', express.static(path.resolve(config.ROOT_DIRECTORY, 'src', 'public'), { maxAge: 0 }));
app.use('/static', (req, res, next) => {
    send(req, parseUrl(req).pathname, { root: path.resolve(config.ROOT_DIRECTORY, 'src', 'public') }).pipe(res);
});
app.use('/', express.static(path.resolve(config.ROOT_DIRECTORY, 'client', 'build'), { maxAge: 60 * 60 * 3 }));

app.get('*', (req, res, next) => {
    // console.log(req)
    if (!req.ws) {
        res.sendFile(path.resolve(config.ROOT_DIRECTORY, 'client', 'build', 'index.html'));
    } else {
        next();
    }
});
// app.use('/',expressStaticGzip(path.resolve(serverPathUrl, 'client', 'dist')));
// const sslOptions = {
//     key: fs.readFileSync('./cert/server.key'),
//     cert: fs.readFileSync('./cert/server.cer')
// };

// const server = https.createServer(sslOptions, app);

// module.exports =  app;
module.exports = app;
