import Auth from '../models/auth.model';
import User from '../models/user.model';
import _ from 'lodash';
import boom from 'boom';
import withController from './Controller/withController';
const Model = Auth;
const ModelName = _.lowerCase(Model.collection.name);
const ModelListName = ModelName + 's';
// let controller = resourcesController(Model, Model.collection.name);
let controller = {};
controller = withController(Model, controller);

controller.postSignUp = async (req, res, next) => {
    console.log(req.body);
    const item = await Model.postSignUp(req.body, req.query);
    res.send({ message: 'sign up success' });
};
controller.postSignIn = async (req, res, next) => {
    if (!req.user) {
        throw boom.badRequest('auth not success');
    }
    res.send({ message: 'sign in success', tokens: req.tokens, user: req.user });
};

export default controller;
