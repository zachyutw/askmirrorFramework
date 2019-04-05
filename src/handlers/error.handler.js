import boom from 'boom';
import logger from '../logger/logger';
import config from '../../config';
import _ from 'lodash';

export const asyncErrorMiddleware = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        if (!err.isBoom) {
            return next(boom.badImplementation(err));
        }
        next(err);
    });
};

const errorHandler = (error, req, res, next) => {
    console.log(error);
    logger.error({ message: error.message, source: req.sourceConnection });
    if (error.name === 'ValidationError') {
        return res.status(400).send({
            domain: config.DOMAIN,
            timestamp: new Date(),
            status: 400,
            message: error.message,
            error: 'Bad Request'
        });
    }
    if (error.name === 'MongoError' && error.code === 11000) {
        return res.status(400).send({
            domain: config.DOMAIN,
            timestamp: new Date(),
            status: 400,
            message: 'Duplicate  Key',
            error: 'Bad Request'
        });
    }

    if (error.isBoom) {
        return res.status(error.output.payload.statusCode).send({
            domain: config.DOMAIN,
            timestamp: new Date(),
            status: error.output.payload.statusCode,
            message: error.output.payload.message,
            error: error.output.payload.message
        });
    }
};
export default errorHandler;
