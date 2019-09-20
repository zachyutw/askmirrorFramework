const boom = require('boom');
const logger = require('../logger/logger');
const _ = require('lodash');

const asyncErrorMiddleware = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        if (!err.isBoom) {
            return next(boom.badImplementation(err));
        }
        next(err);
    });
};

const errorResponse = ({ error, domain, status }) => {
    const errorMessageObj = {
        400: 'Bad Request',
        401: 'Auth Error',
        500: 'Internal Server Error'
    };
    const getErrorMessage = (status) => (errorMessageObj[status] ? errorMessageObj[status] : errorMessageObj[500]);
    return {
        domain,
        timestamp: new Date(),
        status,
        message: error.message,
        errorMessage: getErrorMessage(status)
    };
};
const errorBoomResponse = ({ error, domain }) => ({
    domain,
    timestamp: new Date(),
    status: error.output.payload.statusCode,
    message: error.output.payload.message,
    errorMessage: error.output.payload.message
});

const errorHandler = (error, req, res, next) => {
    const domain = process.env.DOMAIN;
    console.log(error);
    logger.error({ message: error.message, source: req.sourceConnection });
    if (error.name === 'MongoError' && error.code === 11000) {
        console.error('mongo');
        const duplicateError = errorResponse({ error, domain, status: 400 });
        return res.status(400).send(duplicateError);
    } else if (error.message === 'Failed to deserialize user out of session' || error.message === 'Failed to deserialize user out of session') {
        const authError = errorResponse({ error, domain, status: 401 });
        return res.status(401).send(authError);
    } else if (error.isBoom) {
        console.log('123');
        const boomError = errorBoomResponse({ error, domain });
        return res.status(error.output.payload.statusCode).send(boomError);
    } else {
        console.error('error 500');
        const defaultError = errorResponse({ error, domain, status: 500 });
        return res.status(500).send(defaultError);
    }
};
errorHandler.asyncErrorMiddleware = asyncErrorMiddleware;
module.exports = errorHandler;
