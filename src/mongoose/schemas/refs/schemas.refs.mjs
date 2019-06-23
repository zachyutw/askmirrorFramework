import mongoose from 'mongoose';
const { Schema } = mongoose;
export const userRef = { type: Schema.Types.ObjectId, ref: 'User' };
export const messageRef = { type: Schema.Types.ObjectId, ref: 'Message' };
export const imageRef = { type: Schema.Types.ObjectId, ref: 'Image' };
export const commentRef = { type: Schema.Types.ObjectId, ref: 'Comment' };
export const chatroomRef = { type: Schema.Types.ObjectId, ref: 'Chatroom' };
export const blogPostRef = { type: Schema.Types.ObjectId, ref: 'BlogPost' };
export const authRef = { type: Schema.Types.ObjectId, ref: 'auth' };
export const assetRef = { type: Schema.Types.ObjectId, ref: 'asset' };

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

export default combineRefs;
