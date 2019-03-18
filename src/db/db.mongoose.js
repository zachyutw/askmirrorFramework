import Mongoose from 'mongoose';
import logger from '../logger/logger';
import config from '../../config';

const dbMongoose = async () => {
    let DB_HOST = config.DB_HOST;
    let DB_PORT = config.DB_PORT;
    let DB_NAME = config.DB_NAME;
    try {
        await Mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true });
        logger.info('Connected to mongo!!!');
        // combineSeeds();
    } catch (err) {
        logger.error('Could not connect to MongoDB');
    }
};

export default dbMongoose;
