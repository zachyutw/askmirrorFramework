import mongoose from 'mongoose';
import types from './types/types';
import { userRef } from './combineRefs';
const { Schema } = mongoose;
import imageSchema from './image.schema';
export const collection = 'Resume';
export const ResumeSchema = Schema(
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
	{ collection: collection, timestamps: true }
);

export default ResumeSchema;
