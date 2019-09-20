const { emailReg, validateEmail } = require('../validater/validater');
const config = require('../../../../config');
const { DEFAULT_IMAGE } = config;
const emailType = {
    type: String,
    validate: [ validateEmail, 'Please fill a valid email address' ],
    match: [ emailReg, 'Please fill a match email address' ]
};
const providerType = {
    email: emailType,
    photoURL: { type: String },
    displayName: { type: String },
    id: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String }
};

const imageType = {
    photoUrl: { type: String, default: DEFAULT_IMAGE },
    thumbUrl: { type: String, default: DEFAULT_IMAGE },
    tags: [ String ]
};
const contactType = {
    address: String,
    postCode: String,
    city: String,
    addressComponent: { type: String },
    phone: { type: String },
    email: { type: emailType },
    facebook: String,
    twitter: String,
    google: String,
    wechat: String
};
const userDetail = {
    familyName: String,
    givenName: String,
    middleName: String,
    gender: String,
    region: String,
    yearOfBirth: { type: String }
};
const types = { emailType, providerType, imageType, contactType, userDetail };

module.exports = types;
