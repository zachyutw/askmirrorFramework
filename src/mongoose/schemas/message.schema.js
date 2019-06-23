const mongoose = require('mongoose');
const _ = require('lodash');
const { userRef } = require('./combineRefs');
const { Schema } = mongoose;
const collectionName = 'Message';

const schema = Schema(
    {
        text: { type: String, required: true },
        user: { ...userRef },
        isRead: { type: Boolean, default: false }
    },
    { collection: collectionName, timestamps: true }
);
schema.rsef = { type: Schema.Types.ObjectId, ref: collectionName };
module.exports = schema;
