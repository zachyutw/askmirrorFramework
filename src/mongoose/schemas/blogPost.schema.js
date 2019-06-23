const mongoose = require('mongoose');
const _ = require('lodash');
const { userRef, commentRef } = require('./combineRefs');
const PointSchema = require('./point.schema');
const { Schema } = mongoose;
const collection = 'BlogPost';
const BlogPostSchema = Schema(
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
    { collection: collection, timestamps: true }
);
BlogPostSchema.blogPostRef = { type: Schema.Types.ObjectId, ref: collection };
module.exports = BlogPostSchema;
