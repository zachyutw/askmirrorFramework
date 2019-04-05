import User from './user.model';
import factory from '../../factory/factory';
import req from 'supertest';

process.env.TEST_SUITE = 'auth-model';
describe('Create', () => {
    test('Create', async () => {
        const userInstance = await User.factoryCreate();
        const userDoc = await User.postItem(userInstance);
        expect(userDoc.category).not.toEqual('normal');
    });
    test('User Schema', async () => {
        const schema = await User.getSchema();
        const _schema = factory.createData(schema);
        expect(typeof _schema.category).toEqual('string');
    });
});
