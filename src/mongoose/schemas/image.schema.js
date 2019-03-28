import mongoose from 'mongoose';
import config from '../../../config';
const { Schema } = mongoose;
const { DEFAULT_IMAGE } = config;
export const collection = 'Image';
export const ImageSchema = Schema({
    photoUrl: { type: String, default: DEFAULT_IMAGE },
    thumbUrl: { type: String, default: DEFAULT_IMAGE },
    tag: [ String ]
});
export default ImageSchema;
