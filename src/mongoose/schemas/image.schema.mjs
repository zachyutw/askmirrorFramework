const mongoose = require('mongoose');
const config = require('../../../config');
const { Schema } = mongoose;
const { DEFAULT_IMAGE } = config;

const schema = Schema({
    photoUrl: { type: String, default: DEFAULT_IMAGE },
    thumbUrl: { type: String, default: DEFAULT_IMAGE },
    tag: [ String ]
});
module.exports = schema;
