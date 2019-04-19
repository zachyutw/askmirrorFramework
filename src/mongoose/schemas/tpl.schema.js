import mongoose from 'mongoose';
import SchemasTypes from './types/schemas.types';
const { Schema } = mongoose;
export const collection = 'Tpl';
const TplSchema = Schema(
    {
        name: String,
        title: String,
        description: String,
        category: { type: String, default: 'normal' },
        image: SchemasTypes.imageType,
        tags: { type: [ String ], index: true }
    },
    { collection: collection, timestamps: true }
);
TplSchema.index({ category: 1 });

export default TplSchema;
