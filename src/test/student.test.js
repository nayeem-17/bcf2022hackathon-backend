const request = require('supertest')

const app = require('../app');
let student_id;
let commonHeaders = {
    authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsIm5hbWUiOm51bGwsImlhdCI6MTY1OTU5NTg3MH0.Kd6yVys8bMmUiHtbvxB_-vm1tnK0fVBh-rNYL6bHHhY"
}

const login = (Math.random() + 1).toString(36).substring(8);
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
        commonHeaders.authorization = "Bearer " + loginResponse.body.access_token;

    })
})


describe('Admin add student', () => {
    test('should respond with 200', async () => {
        const response = await request(app)
            .post('/api/admin/student/add')
            .set(commonHeaders)
            .send({
                "name": "name",
                "gender": "gender",
                "year": 12
            })

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(typeof response.body.id).toBe("number");
        student_id = response.body.id;
    })
});

describe('Get student list', () => {
    test('should respond with 200', async () => {

        const response = await request(app)
            .get('/api/admin/student/list')
            .set(commonHeaders)
            .send({})

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
    })
})

describe('Get One Student', () => {
    test('should respond with 200', async () => {

        const response = await request(app)
            .get('/api/admin/student/get/' + student_id)
            .set(commonHeaders)

            .send({})

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    })
})

describe('Update one student', () => {
    test('should respond with 200', async () => {

        const response = await request(app)
            .put('/api/admin/student/update/' + student_id)
            .set(commonHeaders)
            .send({
                "name": "nae",
                "gender": "gender",
                "year": 12
            })
        console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();

    })
})

describe('Delete One Student', () => {
    test('should respond with 200', async () => {

        const response = await request(app)
            .delete('/api/admin/student/delete/' + student_id)
            .set(commonHeaders)
            .send({})

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    })
})
