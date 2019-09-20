const mongoose = require('mongoose');
const _ = require('lodash');
const SchemasTypes = require('./types/schemas.types');
const { Schema } = mongoose;
const collectionName = 'Order';
const schema = Schema(
    {
        category: { type: String, default: 'default', index: true },
        image: SchemasTypes.imageType,
        name: { type: String, required: true, index: true },
        tags: { type: [ String ], index: true },
        contact: SchemasTypes.contactType
    },
    { collection: collectionName, timestamps: true }
);
schema.index({ category: 1 });
schema.collectionName = collectionName;
module.exports = schema;
