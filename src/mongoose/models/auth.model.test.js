const Auth = require('./auth.model');
const User = require('./user.model');
const factory = require('../../factory/factory');
const req = require('supertest');
const UserSchema = require('../schemas/user.schema');

process.env.TEST_SUITE = 'auth-model';
describe('Auth Model Testing', () => {
    test('SignUp', async () => {
        const userInstance = User.factoryCreate();
        const newAuth = await Auth.postSignUp({ username: userInstance.username, password: '1234' });
        expect(typeof newAuth.username).toEqual('string');
    });

    test('Schema', async () => {
        const schema = await Auth.getSchema();
        const _schema = factory.createData(schema, { user: '1234' });
        expect(typeof _schema.password).toEqual('number');
    });
});
