const mongoose = require('mongoose');
const types = require('./types/types');
const { Schema } = mongoose;
const collectionName = 'inboxMail';
const schema = Schema(
    {
        to: types.emailType,
        from: types.emailType,
        template: String,
        locals: { type: Schema.Types.Mixed },
        attachments: [ { filename: String, content: String } ],
        subject: String,
        html: String,
        text: String
    },
    { collection: collectionName, timestamps: true }
);
schema.collectionName = collectionName;
module.exports = schema;
