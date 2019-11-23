const express = require('express');
// const _ =require( 'lodash');
const withController = require('./lib/withController');
const withRoute = require('./lib/withRoute');
const User = require('../models/user.model');

let controller = {};
controller = withController(User, controller);
let router = express.Router();
router = withRoute(router, controller);
module.exports = router;
