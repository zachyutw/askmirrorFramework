const mongoose = require('mongoose');
const collectionName = 'Point';
const schema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: [ 'Point' ],
            required: true
        },
        coordinates: {
            type: [ Number ],
            required: true
        }
    },
    { collection: collectionName, timestamps: true }
);
schema.collectionName = collectionName;
module.exports = schema;
