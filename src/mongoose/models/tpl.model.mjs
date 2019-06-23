import mongoose from 'mongoose';
import withModel from './Model/withModel';
import _ from 'lodash';
import TplSchema, { collection } from '../schemas/tpl.schema';
let Model = mongoose.model(collection, TplSchema);
Model = withModel(Model);
/**! New Model method put over here **/

/**! New Model method put over here **/

export default Model;
