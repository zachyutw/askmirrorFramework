const logger = require('../logger/logger');
const logRequests = (req, res, next) => {
    logger.info({
        message: 'API Request',
        originalUrl: req.originalUrl,
        method: req.method,
        source: req.sourceConnection
    });
    next();
};
module.exports = logRequests;
