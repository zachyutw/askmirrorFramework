// const crypto =require( 'crypto');
const crypto = require('crypto');

const sign = (password) => {
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000;
    var hash = pbkdf2(password, salt, iterations);

    return {
        salt: salt,
        hash: hash,
        iterations: iterations
    };
};
function verify (savedHash, savedSalt, savedIterations, passwordAttempt){
    return savedHash == pbkdf2(passwordAttempt, savedSalt, savedIterations);
}

module.exports = {
    sign,
    verify
};
