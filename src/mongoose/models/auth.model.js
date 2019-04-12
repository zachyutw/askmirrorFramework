import mongoose from 'mongoose';
import withModel, { queryItemPlugin } from './Model/withModel';
import _ from 'lodash';
import AuthSchema, { collection } from '../schemas/auth.schema';
import User from './user.model';
let Model = mongoose.model(collection, AuthSchema);
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

export default Model;
