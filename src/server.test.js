import app from './app';
import req from 'supertest';

describe('Test root path', () => {
    test('Should response the GET method', () => {
        return req(app).get('/').expect(200);
    });
});
