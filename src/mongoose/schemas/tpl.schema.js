const mongoose = require('mongoose');
const SchemasTypes = require('./types/schemas.types');
const { Schema } = mongoose;
const collectionName = 'Tpl';
const schema = Schema(
    {
        name: String,
        title: String,
        description: String,
        category: { type: String, default: 'normal' },
        image: SchemasTypes.imageType,
        tags: { type: [ String ], index: true }
    },
    { collection: collectionName, timestamps: true }
);
schema.index({ category: 1 });
schema.collectionName = collectionName;
module.exports = schema;
