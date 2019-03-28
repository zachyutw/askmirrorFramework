import mongoose from 'mongoose';
import types from './types/types';
const { Schema } = mongoose;

export const collection = 'inboxMail';
export const inboxMailSchema = Schema(
	{
		to: types.emailType,
		from: types.emailType,
		template: String,
		locals: { type: Schema.Types.Mixed },
		attachments: [ { filename: String, content: String } ],
		subject: String,
		html: String,
		text: String
	},
	{ collection: collection, timestamps: true }
);

export default inboxMailSchema;
