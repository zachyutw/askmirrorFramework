import mongoose from 'mongoose';
import _ from 'lodash';
import { userRef } from './combineRefs';
const { Schema } = mongoose;
export const collection = 'Message';

const MessageSchema = Schema(
	{
		text: { type: String, required: true },
		user: { ...userRef },
		isRead: { type: Boolean, default: false }
	},
	{ collection: collection, timestamps: true }
);
export default MessageSchema;

export const messageRef = { type: Schema.Types.ObjectId, ref: collection };
