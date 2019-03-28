import User from '../models/user.model';
import _ from 'lodash';
import boom from 'boom';
import withController from './Controller/withController';
const Model = User;
const ModelName = _.lowerCase(Model.collection.name);
const ModelListName = ModelName + 's';
// let controller = resourcesController(Model, Model.collection.name);
let controller = {};
controller = withController(Model, controller);

export default controller;
