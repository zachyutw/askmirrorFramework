import app from './app';
import fs from 'fs';
import _ from 'lodash';
import spdy from 'spdy';
import config from '../config';
import logger from './logger/logger';
// import https from 'https';
import http from 'http';
import jwt from 'jsonwebtoken';
import expressWs from 'express-ws';
import socketServer from './socket/socketServer';
import WSRouter from './wsRouter/wsRouter';
const server = http.createServer(app);
const options = {
    key: fs.readFileSync(config.ROOT_DIRECTORY + '/cert/dev.askmirror.local.key'),
    cert: fs.readFileSync(config.ROOT_DIRECTORY + '/cert/dev.askmirror.local.crt')
};
// const wsRouter = WSRouter.init(server);
// wsRouter.lintenClientConnect();
expressWs(app, server);

let connectedPool = {};
let userPool = {};
const onlinePoolMsg = (userPool, message) => {
    return JSON.stringify({
        type: 'status',
        pool: _.values(userPool),
        message,
        createAt: new Date()
    });
};

app.ws('/ws', function (ws, req, next){
    const id = jwt.decode(req.ws.protocol).id;
    if (req.ws.protocol) {
        const user = jwt.decode(req.ws.protocol) || {};
        connectedPool[req.ws.protocol] = ws;
        userPool[user.id] = req.ws.protocol;
    } else {
        connectedPool[req.headers['sec-websocket-key']] = ws;
    }
    const poolMsg = onlinePoolMsg(userPool, 'join ' + id);
    console.log(ws.readyState);
    // console.log('link');
    // console.log(_.values(connectedPool).length);
    // console.log(connectedPool);
    // console.log(userPool);
    // const user = jwt.decode(decodeURIComponent(req.params.id)) || {};
    // ws.send(JSON.stringify({ type: 'message', text: 'WebSocket Server Welcome ' + user.displayName }));

    ws.on('message', function (msg){
        ws.send(`Hello, you sent -> ${msg}`);
        console.log(msg);
        // console.log(ws.readyState);
        // _.values(connectedPool).map((ws) => {
        //     ws.send(poolMsg);
        // });
        // console.log(req.ws.protocol);
        // console.log(msg);
        // let msgData = {};
        // try {
        //     msgData = JSON.parse(msg);
        // } catch (err) {
        //     msgData = msg;
        // }
        // if (typeof msgData === 'object' && msgData.sendTo) {
        //     msgData.sendFrom = user;
        //     if (queueUser[msgData.sendTo]) {
        //         queueUser[msgData.sendTo].send(JSON.stringify(msgData));
        //     }
        //     if (queueUser[req.params.id]) {
        //         queueUser[req.params.id].send(JSON.stringify(msgData));
        //     }
        // } else if (queueUser[req.params.id]) {
        //     queueUser[req.params.id].send(msg);
        //     console.log(msg + ' send to ' + req.params.id);
        // }
    });
    ws.on('close', (ev) => {
        // const id = ws.protocol ? jwt.decode(ws.protocol).id : req.headers['sec-websocket-key'];
        // const poolMsg = onlinePoolMsg(userPool, 'leave ' + id);
        // broadCast(connectedPool, poolMsg);
        // console.log('close ' + id);
        // delete connectedPool[id];
    });
    ws.send('Hi there, I am a WebSocket server');
    next();
});

socketServer(server);
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
