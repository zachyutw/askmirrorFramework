/**
 * WebSocket router
 */
// const express =require( 'express');
// const expressWS =require( 'express-ws');
const express = require('express');
const expressWS = require('express-ws');

var wsRouter = null;

let queueUser = {};
const broadCast = (queusUser, msg) => {
    const queusUsers = _.values(queusUser);
    queusUsers.map((ws) => {
        ws.send(msg);
    });
};

const onlinePoolMsg = (queueUser, message) => {
    return JSON.stringify({
        type: 'status',
        pool: _.keys(queueUser),
        message,
        createAt: new Date()
    });
};
// app.ws('/ws/queue/:id?', function (ws, req) {
//     console.log('connection user ' + req.params.id);
//     queueUser[req.params.id] = ws;
//     broadCast(queueUser, onlinePoolMsg(queueUser, 'join- ' + req.params.id));
//     const user = jwt.decode(decodeURIComponent(req.params.id)) || {};
//     ws.send(JSON.stringify({ type: 'message', text: 'WebSocket Server Welcome ' + user.displayName }));
//     ws.on('message', function (msg) {
//         let msgData = {};
//         try {
//             msgData = JSON.parse(msg);
//         } catch (err) {
//             msgData = msg;
//         }

//         if (typeof msgData === 'object' && msgData.sendTo) {
//             msgData.sendFrom = user;
//             if (queueUser[msgData.sendTo]) {
//                 queueUser[msgData.sendTo].send(JSON.stringify(msgData));
//             }
//         } else if (queueUser[req.params.id]) {
//             queueUser[req.params.id].send(msg);
//             console.log(msg + ' send to ' + req.params.id);
//         }
//     });
//     ws.on('close', (ev) => {
//         queueUser = _.omit(queueUser, [req.params.id]);
//         broadCast(queueUser, onlinePoolMsg(queueUser, 'leave- ' + req.params.id));
//         console.log('close');
//         // delete connections[req.id];
//     });
// });

class WSRouter {
    constructor (server) {
        this.server = server;
        this.app = express();
        expressWS(this.app, this.server);
    }
    /**
     * 接受client端连接
     */
    lintenClientConnect () {
        var me = this;
        this.app.ws('/ws/queue/:id?', function (ws, req){
            console.log('connection user ' + req.params.id);
            queueUser[req.params.id] = ws;
            broadCast(queueUser, onlinePoolMsg(queueUser, 'join- ' + req.params.id));
            const user = jwt.decode(decodeURIComponent(req.params.id)) || {};
            ws.send(JSON.stringify({ type: 'message', text: 'WebSocket Server Welcome ' + user.displayName }));
            ws.on('message', function (msg){
                let msgData = {};
                try {
                    msgData = JSON.parse(msg);
                } catch (err) {
                    msgData = msg;
                }
                if (typeof msgData === 'object' && msgData.sendTo) {
                    msgData.sendFrom = user;
                    if (queueUser[msgData.sendTo]) {
                        queueUser[msgData.sendTo].send(JSON.stringify(msgData));
                    }
                    if (queueUser[req.params.id]) {
                        queueUser[req.params.id].send(JSON.stringify(msgData));
                    }
                } else if (queueUser[req.params.id]) {
                    queueUser[req.params.id].send(msg);
                    console.log(msg + ' send to ' + req.params.id);
                }
            });
            ws.on('close', (ev) => {
                queueUser = _.omit(queueUser, [ req.params.id ]);
                broadCast(queueUser, onlinePoolMsg(queueUser, 'leave- ' + req.params.id));
                console.log('close');
                // delete connections[req.id];
            });
        });
    }
    /**
     * 发送command到client端
     * @param msg 
     * @param cb 
     */
    sendCmd (msg, cb) {}

    /**
     * 接收client的command请求
     * @param cmd 
     */
    receiveCmd (cmd) {}
}

module.exports = {
    init (server) {
        if (wsRouter == null && server != null) {
            wsRouter = new WSRouter(server);
        }
        return wsRouter;
    }
};
// module.exports =  {
//     init (server) {
//         if (wsRouter == null && server != null) {
//             wsRouter = new WSRouter(server);
//         }
//         return wsRouter;
//     }
// };
