import jwt from 'jsonwebtoken';
import uuidv1 from 'uuid/v1';
import boom from 'boom';
import moment from 'moment';
const Roles = {
    USER: 60 * 60 * 24 * 3,
    VERIFY_TOKEN: 60 * 60 * 24
};
const JWTSecurity = {};
/**
 * @param {Object} config - sign function configuration
 * @param {string} config.role ENUM | USER, VERIFY
 * @param {number} config.expiresIn expire time 
 */
const sign = (payload = {}, config = {}) => {
    let expiresIn = 60 * 60 * 24 * 3;
    if (config.expiresIn) {
        expiresIn = config.expiresIn;
    } else if (Roles[config.role]) {
        expiresIn = Roles[config.role];
    }
    const issuer = process.env.DOMAIN;
    const audience = process.env.DOMAIN;
    const token = jwt.sign(payload, process.env.JWT_SECRECT, { expiresIn });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_JWT_SECRECT, { expiresIn: 60 * 60 * 24 * 30 });
    const tokens = {
        accessToken: token,
        tokenType: 'bearer',
        refreshToken,
        expiresIn,
        role: config.role,
        expiresAfter: moment(expiresIn).format('LLLL'),
        uuid: uuidv1()
    };
    return tokens;
};
const verify = (accessToken = '') => {
    const payload = jwt.verify(accessToken.replace(/Bearer /g, ''), process.env.JWT_SECRECT, (err, payload) => {
        if (err) {
            throw boom.unauthorized(err.message);
        }
        return payload;
    });
    return payload;
};
JWTSecurity.sign = sign;
JWTSecurity.verify = verify;
export default JWTSecurity;
