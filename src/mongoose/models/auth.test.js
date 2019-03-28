import Auth from './auth.model';

import req from 'supertest';

describe('Read', () => {
    let auths;

    test('Should response the GET method', async () => {
        const newAuth = await Auth.postItem({ username: 'abc1234', password: '1234' });
        expect(newAuth.username).toEqual('abc1234');
    });
});
