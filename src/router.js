const userAPI = require('./mongoose/controllers/user.controller');
const authAPI = require('./mongoose/controllers/auth.controller');
const tplAPI = require('./mongoose/controllers/tpl.controller');
const crawlerAPI = require('./crawler/controllers/crawler.controller');
const boom = require('boom');

/**
 * @param {*} app express
 */
const combineRoutes = (app) => {
    app.use(`/api/user`, userAPI);
    app.use(`/api/auth`, authAPI);
    app.use(`/api/tpl`, tplAPI);
    app.use(`/api/crawler`, crawlerAPI);
    // app.use(`/api/chatroom`, RESTPlugins.allFunctionsPlugin, chatroom);
    // app.use(`/api/auth`, RESTPlugins.allFunctionsPlugin, auth);
    // app.use(`/api/user`, RESTPlugins.allFunctionsPlugin, user);
    // app.use(`/api/product`, RESTPlugins.allFunctionsPlugin, product);
    // app.use(`/api/account`, RESTPlugins.allFunctionsPlugin, authorize.authorized, account);
    // app.use(`/api/inboxEmail`, inboxEmail);
    // app.use(`/api/seed`, seed);
    // app.use(`/api/googleMap`, googleMap);
    // app.use(`/api/asset`, asset);
    // app.use(`/api/assets`, publicFiles);
    app.use(`/api/*`, function (req, res, next){
        next(boom.notFound('Not Found'));
    });
};

module.exports = combineRoutes;
