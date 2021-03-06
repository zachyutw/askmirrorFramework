const mongoose = require('mongoose');
const { Schema } = mongoose;
const imageSchema = require('./image.schema');
const collectionName = 'Product';
const schema = Schema(
    {
        name: { type: String, required: true },
        category: { type: String, index: true, default: 'default' },
        price: { type: Number, default: 0 },
        brand: { type: String },
        weight: { type: Number },
        desc: { type: String, default: 'We are building more contents for our products' },
        supplier: { type: String, default: 'JSislasndClan' },
        useageCount: { type: String, default: 1 },
        unitPrice: { type: Number, default: 0 },
        unitGroupNumber: { type: Number, default: 1 },
        grade: { type: Number, default: 1 },
        marketPrice: { type: Number },
        inventoryCount: { type: Number, default: 9999 },
        image: imageSchema
    },
    { collection: collectionName, timestamps: true }
);
schema.collectionName = collectionName;
module.exports = schema;
