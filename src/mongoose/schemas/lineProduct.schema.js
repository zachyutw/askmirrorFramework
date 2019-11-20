const mongoose = require('mongoose');
const { Schema } = mongoose;
const collectionName = 'LineProduct';
const schema = Schema(
    {
        quantity: { type: Number, default: 0 },
        category: { type: String, default: 'default', index: true },
        service: {},
        price: {}
    },
    { collection: collectionName, timestamps: true }
);
schema.index({ category: 1 });
schema.collectionName = collectionName;
module.exports = schema;
