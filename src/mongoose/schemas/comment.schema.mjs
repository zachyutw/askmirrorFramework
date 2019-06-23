import mongoose from 'mongoose';
import _ from 'lodash';
import { userRef, messageRef } from './combineRefs';
const { Schema } = mongoose;
export const collection = 'Comment';
const CommentSchema = Schema(
	{
		user: { ...userRef, required: true },
		text: { type: String, default: '' },
		messages: [ messageRef ],
		likedType: { type: Number, default: 0 }
	},
	{ collection: collection, timestamps: true }
);

export default CommentSchema;
export const commentRef = { type: Schema.Types.ObjectId, ref: collection };
