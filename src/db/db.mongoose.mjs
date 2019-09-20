const Mongoose =require( 'mongoose');
const logger =require( '../logger/logger');

const dbMongoose = async () => {
    const DB_HOST = process.env.DB_HOST;
    const DB_PORT = process.env.DB_PORT;
    const DB_NAME = process.env.DB_NAME;
    try {
        await Mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
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

module.exports =  dbMongoose;
