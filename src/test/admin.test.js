const request = require('supertest')

const app = require('../app');

const login = (Math.random() + 1).toString(36).substring(7);
describe('given username and password', () => {
    test('should respond with 200', async () => {
        const response = await request(app).post('/api/admin/create').send({
            "login": login,
            "password": "pass355dcvs6sd"
        })
        expect(response.statusCode).toBe(200);

    })
});

describe('Login', () => {
    test('should respond with 200', async () => {
        const loginResponse = await request(app).post('/api/admin/login').send({
            "login": login,
            "password": "pass355dcvs6sd"
        })
        expect(loginResponse.statusCode).toBe(200)
        expect(loginResponse.body).toBeDefined()
        expect(typeof loginResponse.body.access_token).toBe("string")
    })
})
