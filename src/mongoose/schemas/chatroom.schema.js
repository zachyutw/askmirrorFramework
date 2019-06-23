const mongoose = require('mongoose');
const _ = require('lodash');
const { userRef, messageRef } = require('./combineRefs');
const { Schema } = mongoose;
const collectionName = 'Chatroom';
const schema = Schema(
    {
        hostUser: { ...userRef, required: true },
        targetUser: { ...userRef },
        groupUsers: [ { ...userRef } ],
        messages: [ messageRef ],
        isRead: { type: Boolean, default: false },
        isGroupChat: { type: Boolean, default: false }
    },
    { collection: collectionName, timestamps: true }
);
schema.FKs = [ 'hostUser', 'targetUser', 'groupUsers' ];
schema.chatroomRef = { type: Schema.Types.ObjectId, ref: collectionName };
schema.collectionName = collectionName;
module.exports = schema;
