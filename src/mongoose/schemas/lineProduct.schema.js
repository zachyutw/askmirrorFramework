import mongoose from 'mongoose';
import _ from 'lodash';
import SchemasTypes from './types/schemas.types';
const { Schema } = mongoose;
export const collection = 'LineProduct';
const LineProductSchema = Schema(
    {
        quantity: { type: Number, default: 0 },
        category: { type: String, default: 'default', index: true },
        service: {},
        price: {}
    },
    { collection: collection, timestamps: true }
);
LineProductSchema.index({ category: 1 });

export default LineProductSchema;
