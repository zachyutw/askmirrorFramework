const Mongoose = require('mongoose');
const logger = require('../logger/logger');

const dbMongoose = async () => {
    try {
        await Mongoose.connect(process.env.MONGO_DB_URL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });
        logger.info('Connected to mongo!!!');
        // combineSeeds();
    } catch (err) {
        logger.error('Could not connect to MongoDB');
    }
};

module.exports = dbMongoose;
