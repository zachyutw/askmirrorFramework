const mongoose = require('mongoose');
const _ = require('lodash');
const { userRef, commentRef } = require('./combineRefs');
const PointSchema = require('./point.schema');
const { Schema } = mongoose;
const collectionName = 'BlogPost';
const schema = Schema(
    {
        user: { ...userRef, required: true, index: true },
        title: String,
        desc: String,
        innerHtml: String,
        tag: String,
        schedule: Date,
        link: String,
        loc: { type: PointSchema, index: true },
        isCommented: Boolean,
        comments: [ commentRef ]
    },
	{ collection: collectionName, timestamps: true }
);
schema.ref = { type: Schema.Types.ObjectId, ref: collectionName };
module.exports = schema;
