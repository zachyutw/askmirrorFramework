const express = require('express');
// const controller =require( '../mongoose/controllers/tpl.controller');
const withRoute = require('./Route/withRoute');
const { asyncErrorMiddleware } = require('../handlers/error.handler');
const controller = require('../crawler/crawler.controller');
let router = express.Router();
/**! New router path put over here **/

/**! New router path put over here **/
router.get('/html', asyncErrorMiddleware(controller['getHtml']));
router.get('/ck101', asyncErrorMiddleware(controller['getCk101']));
router = withRoute(router, controller);
module.exports = router;
