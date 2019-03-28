import mongoose from 'mongoose';
const { Schema } = mongoose;
import config from '../core/config/config.dev';
export const collection = 'Asset';
export const AssetSchema = new mongoose.Schema(
	{
		fieldname: String,
		originalname: String,
		encoding: String,
		mimetype: String,
		destination: String,
		filename: { type: String, required: true, unique: true },
		path: String,
		size: Number,
		status: { type: Number, default: 0 },
		domainName: { type: String, default: config.domainName },
		url: { type: String, unique: true }
	},
	{ collection: collection, timestamps: true }
);

export default AssetSchema;
