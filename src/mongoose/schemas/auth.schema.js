const mongoose = require('mongoose');
const SchemasTypes = require('./types/schemas.types');
const refs = require('./refs/schemas.refs');
const { Schema } = mongoose;
const collectionName = `Auth`;
const enumRoles = [ 'guest', 'primary', 'admin' ];
const enumPrivilege = [ 'Read Only', 'Read and Write', 'Write Only' ];
const { userRef } = refs;
const schema = Schema(
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
    { collection: collectionName, timestamps: true }
);
schema.plugin(require('mongoose-autopopulate'));
schema.ref = { type: Schema.Types.ObjectId, ref: collectionName };
schema.collection = collectionName;
module.exports = schema;
