import Auth from '../models/auth.model';
import _ from 'lodash';
import boom from 'boom';
import withController from './Controller/withController';
const Model = Auth;
const ModelName = _.lowerCase(Model.collection.name);
const ModelListName = ModelName + 's';
// let controller = resourcesController(Model, Model.collection.name);
let controller = {};
controller = withController(Model, controller);

controller.postItem = async (req, res, next) => {
    const item = await Model.postItem(req.body, req.query);
    res.send({ message: 'success', [ModelName]: item });
};
controller.postSignUp = async (req, res, next) => {
    const item = await Model.postItem(req.body, req.query);

    res.send({ message: 'sign up success' });
};

export default controller;
