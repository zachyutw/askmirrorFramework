import Auth from './auth.model';
import User from './user.model';
import factory from '../../factory/factory';
import req from 'supertest';
import UserSchema from '../schemas/user.schema';

process.env.TEST_SUITE = 'auth-model';
describe('Auth Model Testing', () => {
    test('SignUp', async () => {
        const userInstance = User.factoryCreate();
        const newAuth = await Auth.postSignUp({ username: userInstance.username, password: '1234' });
        expect(typeof newAuth.username).toEqual('string');
    });

    test('Schema', async () => {
        const schema = await Auth.getSchema();
        const _schema = factory.createData(schema, { user: '123' });
        expect(typeof _schema.password).toEqual('number');
    });
});
