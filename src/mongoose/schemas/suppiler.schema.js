import mongoose from 'mongoose';
import _ from 'lodash';
import SchemasTypes from './types/schemas.types';
const { Schema } = mongoose;
export const collection = 'Suppiler';
const SuppilerSchema = Schema(
    {
        name: { type: String, required: true, index: true },
        category: { type: String, default: 'default', index: true },
        image: SchemasTypes.imageType,
        tags: { type: [ String ] },
        contact: SchemasTypes.contactType
    },
    { collection: collection, timestamps: true }
);
SuppilerSchema.index({ category: 1 });

export default SuppilerSchema;
