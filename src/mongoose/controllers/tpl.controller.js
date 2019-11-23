const express = require('express');
// const _ =require( 'lodash');
const withController = require('./lib/withController');
const withRoute = require('./lib/withRoute');
const Tpl = require('../models/tpl.model');

let controller = {};
controller = withController(Tpl, controller);
let router = express.Router();
router = withRoute(router, controller);
module.exports = router;
