import mongoose from 'mongoose';
export const collection = 'Point';
const PointSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: [ 'Point' ],
			required: true
		},
		coordinates: {
			type: [ Number ],
			required: true
		}
	},
	{ collection: collection, timestamps: true }
);
export default PointSchema;
