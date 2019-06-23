import mongoose from 'mongoose';
import _ from 'lodash';
import { userRef, messageRef } from './combineRefs';
const { Schema } = mongoose;
export const collection = 'Chatroom';
const ChatroomSchema = Schema(
	{
		hostUser: { ...userRef, required: true },
		targetUser: { ...userRef },
		groupUsers: [ { ...userRef } ],
		messages: [ messageRef ],
		isRead: { type: Boolean, default: false },
		isGroupChat: { type: Boolean, default: false }
	},
	{ collection: collection, timestamps: true }
);

export default ChatroomSchema;

export const FKs = [ 'hostUser', 'targetUser', 'groupUsers' ];
export const chatroomRef = { type: Schema.Types.ObjectId, ref: collection };
