import mongoose from 'mongoose';
import _ from 'lodash';
import SchemasTypes from './types/schemas.types';
const { Schema } = mongoose;
export const collection = 'Order';
const OrderSchema = Schema(
    {
        category: { type: String, default: 'default', index: true },
        image: SchemasTypes.imageType,
        name: { type: String, required: true, index: true },
        tags: { type: [ String ], index: true },
        contact: SchemasTypes.contactType
    },
    { collection: collection, timestamps: true }
);
OrderSchema.index({ category: 1 });

export default OrderSchema;
