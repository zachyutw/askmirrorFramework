const mongoose = require('mongoose');
const types = require('./types/types');
const { userRef } = require('./combineRefs');
const { Schema } = mongoose;
const imageSchema = require('./image.schema');
const collectionName = `Resume`;
const schema = Schema(
    {
        user: { ...userRef, required: true, unique: true },
        appler: {
            firstName: String,
            lastName: String
        },
        info: {
            address: String
        },
        contact: {
            phone: String,
            email: types.emailType
        },
        websites: [ { name: String, url: String, icon: String } ],
        skills: [ { category: String, name: String, experience: String } ],
        photoUrl: { type: String },
        image: imageSchema
    },
    { collection: collectionName, timestamps: true }
);
schema.collectionName = collectionName;
module.exports = schema;
