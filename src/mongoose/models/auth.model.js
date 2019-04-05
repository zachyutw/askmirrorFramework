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
    console.log('123');
    if (user) {
        auth = await Model.postItem({ ...data, user: user._id });
    }
    return auth;
};

/**! New Model method put over here **/

export default Model;
