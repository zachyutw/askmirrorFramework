import mongoose from 'mongoose';
import _ from 'lodash';
import { userRef, commentRef } from './combineRefs';
import PointSchema from './point.schema';
const { Schema } = mongoose;
export const collection = 'BlogPost';
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

export default BlogPostSchema;
export const blogPostRef = { type: Schema.Types.ObjectId, ref: collection };
