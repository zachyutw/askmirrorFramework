import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

beforeEach((done) => {
    const clearMongoDB = () => {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].deleteOne(function (){});
        }
        return done();
    };
    if (mongoose.connection.readyState === 0) {
        mongoose.connect(
            `mongodb://localhost:27017/${process.env.TEST_SUITE}`,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useFindAndModify: false
            },
            (err) => {
                if (err) {
                    throw err;
                }
                return clearMongoDB();
            }
        );
    } else {
        return clearMongoDB();
    }
});
afterEach((done) => {
    mongoose.disconnect();
    return done();
});
afterAll((done) => {
    return done();
});
