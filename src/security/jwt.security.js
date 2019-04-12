import jwt from 'jsonwebtoken';
import uuidv1 from 'uuid/v1';

const Roles = {
    USER: { expire_minutes: 60 * 24 * 30 * 6 }
};

const JWTTokens = (user, config = {}) => {
    let expiresIn = 60 * 24 * 30 * 3;
    if (config.expiresIn) {
        expiresIn = config.expiresIn;
    } else if (Roles[config.role]) {
        expiresIn = Roles[config.role];
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRECT, { expiresIn });
    const refreshToken = jwt.sign({ user }, process.env.REFRESH_JWT_SECRECT, { expiresIn: 60 * 24 * 30 });
    const tokens = {
        accessToken: token,
        tokenType: 'bearer',
        refreshToken,
        expiresIn,
        uuid: uuidv1()
    };
    return tokens;
};

export default JWTTokens;
