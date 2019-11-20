const mongoose = require('mongoose');
const _ = require('lodash');
const SchemasTypes = require('./types/schemas.types');
const { Schema } = mongoose;
const collectionName = `User`;
const schema = Schema(
    {
        username: { type: String, required: true, unique: true },
        category: { type: String, default: 'normal' },
        image: SchemasTypes.imageType,
        name: { type: String, default: 'New User' },
        tags: { type: [ String ], index: true },
        detail: SchemasTypes.userDetail,
        contact: SchemasTypes.contactType
    },
    { collection: collectionName, timestamps: true }
);
schema.index({ category: 1 });
schema.collectionName = collectionName;
module.exports = schema;
