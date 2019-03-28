import mongoose from 'mongoose';
import withModel, { queryItemPlugin } from './Model/withModel';
import _ from 'lodash';
import AuthSchema, { collection } from '../schemas/auth.schema';
import User from './user.model';
let Model = mongoose.model(collection, AuthSchema);
Model = withModel(Model);

Model.postItem = async (data, params) => {
    const user = await User.postItem({ username: data.username });
    const model = Model({ ...data, user: user.id });
    const doc = await model.save();
    let query = Model.findOne({ _id: doc._id });
    query = queryItemPlugin(query, params);
    return query.exec();
};

/**! New Model method put over here **/

/**! New Model method put over here **/

export default Model;
