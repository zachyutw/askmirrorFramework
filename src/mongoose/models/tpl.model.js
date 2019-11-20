const mongoose = require('mongoose');
const withModel = require('./Model/withModel');
const _ = require('lodash');
const TplSchema = require('../schemas/tpl.schema');
let Model = mongoose.model(TplSchema.collectionName, TplSchema);
Model = withModel(Model);
/**! New Model method put over here **/

/**! New Model method put over here **/

module.exports = Model;
