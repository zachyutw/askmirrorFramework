import Tpl from '../models/tpl.model';
import _ from 'lodash';
import withController from './Controller/withController';
const Model = Tpl;
const ModelName = _.lowerCase(Model.collection.name);
// const ModelListName = ModelName + 's';
// let controller = resourcesController(Model, Model.collection.name);
let controller = {};
controller = withController(Model, controller);

export default controller;
