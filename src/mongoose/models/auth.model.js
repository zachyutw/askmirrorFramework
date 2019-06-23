const mongoose = require('mongoose');
const withModel = require('./Model/withModel');
const _ = require('lodash');
const AuthSchema = require('../schemas/auth.schema');
const User = require('./user.model');
let Model = mongoose.model(AuthSchema.collectionName, AuthSchema);
Model = withModel(Model);

/**! New Model method put over here **/
Model.postSignUp = async (data, params) => {
    const user = await User.postItem({ username: data.username }, params);
    let auth = null;
    if (user) {
        auth = await Model.postItem({ ...data, user: user._id });
    }
    return auth;
};
Model.signUpOrUpdate = async (query, { username, provider }) => {
    let auth = await Model.findOneAndUpdate(query);
    if (!auth) {
        auth = await Model.postSignUp({ username, password: process.env.DEFAULT_PASSWORD, provider });
    }
    return auth;
};

/**! New Model method put over here **/

module.exports = Model;
