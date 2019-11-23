const nginxSourceConnection = (req, res, next) => {
    let sourceConnection = {};
    sourceConnection['user-agent'] = req.headers['user-agent'];
    sourceConnection['host'] = req.headers['host'];
    sourceConnection['ip'] =
        req.headers['x-real-ip'] || req.connection['remoteAddress'];
    sourceConnection['x-forwarded-for'] = req.headers['x-forwarded-for'];
    req.sourceConnection = sourceConnection;
    next();
};

module.exports = nginxSourceConnection;
