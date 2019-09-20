const app = require('./app');
const req = require('supertest');
process.env.TEST_SUITE = 'server-test';
describe('Test root path', () => {
    test('Should response the GET method', () => {
        return req(app).get('/').expect(200);
    });
});
