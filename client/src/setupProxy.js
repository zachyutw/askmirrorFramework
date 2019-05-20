const proxy = require('http-proxy-middleware');
const URI = process.env.REVERSE_PROXY_URI || 'ws://localhost:5000';
module.exports = function (app){
    const apiProxy = proxy('/graphql', { target: URI });
    const wsProxy = proxy('/ws', { ws: true, target: URI });
    app.use(apiProxy);
    app.use(wsProxy);
};
