const mongoose = require('mongoose');
const { Schema } = mongoose;
const config = require('../core/config/config.dev');
const collectionName = 'Asset';
const schema = new mongoose.Schema(
    {
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: { type: String, required: true, unique: true },
        path: String,
        size: Number,
        status: { type: Number, default: 0 },
        domainName: { type: String, default: config.domainName },
        url: { type: String, unique: true }
    },
    { collection: collectionName, timestamps: true }
);
schema.collectionName = collectionName;
module.exports = schema;
