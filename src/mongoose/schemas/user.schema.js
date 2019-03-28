import mongoose from 'mongoose';
import _ from 'lodash';
import SchemasTypes from './types/schemas.types';
const { Schema } = mongoose;
export const collection = 'User';
const UserSchema = Schema(
    {
        username: { type: String, required: true, unique: true },
        category: { type: String, default: 'normal' },
        image: SchemasTypes.imageType,
        name: { type: String, default: 'New User' },
        tags: { type: [ String ], index: true },
        detail: { type: SchemasTypes.userDetail },
        contact: SchemasTypes.contactType
    },
    { collection: collection, timestamps: true }
);
UserSchema.index({ category: 1 });

export default UserSchema;
