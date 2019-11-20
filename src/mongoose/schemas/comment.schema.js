const mongoose = require('mongoose');
const _ = require('lodash');
const { userRef, messageRef } = require('./combineRefs');
const { Schema } = mongoose;
const collectionName = 'Comment';
const schema = Schema(
    {
        user: { ...userRef, required: true },
        text: { type: String, default: '' },
        messages: [ messageRef ],
        likedType: { type: Number, default: 0 }
    },
    { collection: collectionName, timestamps: true }
);
schema.ref = { type: Schema.Types.ObjectId, ref: collectionName };
schema.collectionName = collectionName;
module.exports = schema;
