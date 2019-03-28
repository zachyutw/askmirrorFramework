'use strict';

var _express = _interopRequireDefault(require('express'));

var _https = _interopRequireDefault(require('https'));

var _http = _interopRequireDefault(require('http'));

var _fs = _interopRequireDefault(require('fs'));

var _bodyParser = _interopRequireDefault(require('body-parser'));

var _cookieSession = _interopRequireDefault(require('cookie-session'));

var _passport = _interopRequireDefault(require('passport'));

var _logger = _interopRequireDefault(require('./logger/logger'));

var _morgan = _interopRequireDefault(require('morgan'));

var _config = _interopRequireDefault(require('./config'));

var _path = _interopRequireDefault(require('path'));

var _cors = _interopRequireDefault(require('cors'));

var _dotenv = _interopRequireDefault(require('dotenv'));

var _expressStaticGzip = _interopRequireDefault(require('express-static-gzip'));

var _compression = _interopRequireDefault(require('compression'));

function _interopRequireDefault (obj){
    return obj && obj.__esModule ? obj : { default: obj };
}

// import config from './core/config/config.dev';
// import connectToDb from './db/connect';
// import socketIo from './services/socketIo';
// import Passport from './services/passport';
// import combineRoutes from './routes/combineRoutes';
// import { corsOptionsDelegate } from './services/cors.service';
_dotenv.default.config();

var oneYear = 1 * 365 * 24 * 60 * 60 * 1000; //? generatro a path which always pooint to corrent root directoriy

var jwtSecrect = 'lasfu'; //* passport setup
// const port = config.PORT;
// connectToDb();

var app = (0, _express.default)(); //* Node.js compression middleware.

app.use((0, _compression.default)());
app.use(_bodyParser.default.json());
app.use(
    _bodyParser.default.urlencoded({
        extended: true
    })
);
app.use(
    (0, _morgan.default)('combined', {
        stream: _logger.default.stream,
        skip: function skip (req, res){
            return res.statusCode < 400;
        }
    })
);
app.use(
    (0, _cookieSession.default)({
        name: 'session',
        //! d    hh    mm  ss
        maxAge: 24 * 60 * 60 * 1000,
        // 24 hours
        keys: [ _config.default.SESSION_SECRET ]
    })
); // Passport();

app.use(_passport.default.initialize());
app.use(_passport.default.session()); // app.use(cors(corsOptionsDelegate));
// app.options('*', cors(corsOptionsDelegate));
// combineRoutes(app);
// const serverPathUrl = serverPath();

app.use(
    '/',
    _express.default.static(_path.default.resolve(__dirname, 'client', 'build'), {
        maxAge: 60 * 60 * 3
    })
);
app.get('*', function (req, res){
    res.sendFile(_path.default.resolve(__dirname, 'client', 'build', 'index.html'));
}); // app.use('/',expressStaticGzip(path.resolve(serverPathUrl, 'client', 'dist')));
// const sslOptions = {
//     key: fs.readFileSync('./cert/server.key'),
//     cert: fs.readFileSync('./cert/server.cer')
// };
// const server = https.createServer(sslOptions, app);

var server = _http.default.createServer(app);

server.listen(_config.default.PORT, function (){
    _logger.default.info('server started - ' + _config.default.domain);
});
