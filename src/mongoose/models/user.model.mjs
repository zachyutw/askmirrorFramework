const mongoose = require('mongoose');
const withModel = require('./Model/withModel');
const _ = require('lodash');
const UserSchema = require('../schemas/user.schema');
let Model = mongoose.model(UserSchema.collectionName, UserSchema);
Model = withModel(Model);
/**! New Model method put over here **/

/**! New Model method put over here **/

module.exports = Model;
