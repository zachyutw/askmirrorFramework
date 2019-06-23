import _ from 'lodash';
import { model } from 'mongoose';

export const getSchema = (Model) => async (req, res, next) => {
    const modelName = _.lowerCase(Model.collection.name);
    const schemaName = modelName + 'Schema';
    const schema = await Model.getSchema();
    res.send({ schema });
};

export const getListCount = (Model) => async (req, res, next) => {
    const modelName = _.lowerCase(Model.collection.name);
    const lengthName = modelName + 'Length';
    const count = await Model.getListCount(req.query);
    res.send({ [lengthName]: count });
};
export const getList = (Model) => async (req, res, next) => {
    const modelName = _.lowerCase(Model.collection.name);
    const listName = modelName + 's';
    const list = await Model.getList(req.query);
    res.send({ [listName]: list });
};
export const postItem = (Model) => async (req, res, next) => {
    const modelName = _.lowerCase(Model.collection.name);
    const item = await Model.postItem(req.body, req.query);
    res.send({ [modelName]: item });
};
export const getItem = (Model) => async (req, res, next) => {
    const modelName = _.lowerCase(Model.collection.name);
    const item = await Model.getItem({ _id: req.params.id }, req.query);
    res.send({ [modelName]: item });
};
export const putItem = (Model) => async (req, res, next) => {
    const modelName = _.lowerCase(Model.collection.name);
    const item = await Model.putItem({ _id: req.params.id }, req.body, req.query);
    res.send({ [modelName]: item });
};
export const deleteItem = (Model) => async (req, res, next) => {
    const modelName = _.lowerCase(Model.collection.name);
    const item = await Model.deleteItem({ _id: req.params.id }, req.query);
    res.send({ [modelName]: item });
};

export default (Model, controller) => {
    controller.getSchema = getSchema(Model);
    controller.getListCount = getListCount(Model);
    controller.getList = getList(Model);
    controller.postItem = postItem(Model);
    controller.getItem = getItem(Model);
    controller.putItem = putItem(Model);
    controller.deleteItem = deleteItem(Model);
    return controller;
};
