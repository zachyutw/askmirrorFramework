import mongoose from 'mongoose';
import SchemasTypes from './types/schemas.types';
import refs from './refs/schemas.refs';
const { Schema } = mongoose;
export const collection = 'Auth';
const enumRoles = [ 'guest', 'primary', 'admin' ];
const enumPrivilege = [ 'Read Only', 'Read and Write', 'Write Only' ];
const { userRef } = refs;
const AuthSchema = Schema(
    {
        user: { ...userRef, required: true, unique: true, autopopulate: { maxDepth: 2 } },
        username: { type: String, required: true, unique: true },
        password: { type: String },
        email: SchemasTypes.emailType,
        provider: {
            google: SchemasTypes.providerType,
            wechat: SchemasTypes.providerType,
            phone: SchemasTypes.providerType,
            imgur: SchemasTypes.providerType
        },
        role: { type: String, enum: enumRoles, default: 'guest' },
        isActived: {
            type: Boolean,
            default: true
        }
    },
    { collection: collection, timestamps: true }
);
AuthSchema.plugin(require('mongoose-autopopulate'));
export default AuthSchema;
export const authRef = { type: Schema.Types.ObjectId, ref: collection };
