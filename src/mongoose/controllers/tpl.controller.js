const Tpl =require( '../models/tpl.model');
const _ =require( 'lodash');
const withController =require( './Controller/withController');
const Model = Tpl;
const ModelName = _.lowerCase(Model.collection.name);
// const ModelListName = ModelName + 's');
// let controller = resourcesController(Model, Model.collection.name);
let controller = {};
controller = withController(Model, controller);

module.exports =  controller;
