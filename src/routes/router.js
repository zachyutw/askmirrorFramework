const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const tplRoute = require('./tpl.route');
const crawlerRoute = require('./crawler.route');
const boom = require('boom');

/**
 * @param {*} app express
 */
const combineRoutes = (app) => {
    app.use(`/api/user`, userRoute);
    app.use(`/api/auth`, authRoute);
    app.use(`/api/tpl`, tplRoute);
    app.use(`/api/crawler`, crawlerRoute);
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
