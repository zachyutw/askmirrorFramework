const mongoose = require('mongoose');
const { Schema } = mongoose;
const userRef = { type: Schema.Types.ObjectId, ref: 'User' };
const messageRef = { type: Schema.Types.ObjectId, ref: 'Message' };
const imageRef = { type: Schema.Types.ObjectId, ref: 'Image' };
const commentRef = { type: Schema.Types.ObjectId, ref: 'Comment' };
const chatroomRef = { type: Schema.Types.ObjectId, ref: 'Chatroom' };
const blogPostRef = { type: Schema.Types.ObjectId, ref: 'BlogPost' };
const authRef = { type: Schema.Types.ObjectId, ref: 'auth' };
const assetRef = { type: Schema.Types.ObjectId, ref: 'asset' };

const combineRefs = {
    userRef,
    messageRef,
    imageRef,
    commentRef,
    chatroomRef,
    blogPostRef,
    authRef,
    assetRef
};

module.exports = combineRefs;
