import mongoose from 'mongoose';
import withModel from './Model/withModel';
import _ from 'lodash';
import UserSchema, { collection } from '../schemas/user.schema';
let Model = mongoose.model(collection, UserSchema);
Model = withModel(Model);
/**! New Model method put over here **/

/**! New Model method put over here **/

export default Model;
