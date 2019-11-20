// const express =require( 'express');
// const controller =require( '../mongoose/controllers/user.controller');
// const withRoute =require( './Route/withRoute');

const express = require('express');
const controller = require('../mongoose/controllers/user.controller');
const withRoute = require('./Route/withRoute');

let router = express.Router();
router = withRoute(router, controller);
// module.exports =  router;
module.exports = router;
