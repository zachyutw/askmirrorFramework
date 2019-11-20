const mongoose = require('mongoose');
const _ = require('lodash');
const SchemasTypes = require('./types/schemas.types');
const { Schema } = mongoose;
const collectionName = `Suppiler`;
const schema = Schema(
    {
        name: { type: String, required: true, index: true },
        category: { type: String, default: 'default', index: true },
        image: SchemasTypes.imageType,
        tags: { type: [ String ] },
        contact: SchemasTypes.contactType
    },
    { collection: collectionName, timestamps: true }
);
schema.index({ category: 1 });
schema.collectionName = collectionName;
module.exports = schema;
