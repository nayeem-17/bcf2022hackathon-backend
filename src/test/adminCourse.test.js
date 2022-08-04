const request = require('supertest')

const app = require('../app');
let course_id;
let commonHeaders = {
    authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsIm5hbWUiOm51bGwsImlhdCI6MTY1OTU5NTg3MH0.Kd6yVys8bMmUiHtbvxB_-vm1tnK0fVBh-rNYL6bHHhY"
}

describe('Login', () => {
    test('should respond with 200', async () => {
        const loginResponse = await request(app).post('/api/admin/login').send({
            "login": "bcf",
            "password": "yo"
        })
        expect(loginResponse.statusCode).toBe(200)
        expect(loginResponse.body).toBeDefined()
        expect(typeof loginResponse.body.access_token).toBe("string")
        commonHeaders.authorization = "Bearer " + loginResponse.body.access_token;
    })
})


describe('Admin add course', () => {
    test('should respond with 200', async () => {
        const response = await request(app)
            .post('/api/admin/course/add')
            .set(commonHeaders)
            .send({
                "name": "c",
                "description": "desc"
            })

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(typeof response.body.id).toBe("number");
        course_id = response.body.id;
    })
});

describe('Get course list', () => {
    test('should respond with 200', async () => {

        const response = await request(app)
            .get('/api/admin/course/list')
            .set(commonHeaders)

            .send({})

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
    })
})

describe('Get One Course', () => {
    test('should respond with 200', async () => {

        const response = await request(app)
            .get('/api/admin/course/get/' + course_id)
            .set(commonHeaders)

            .send({})

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    })
})

describe('Update one course', () => {
    test('should respond with 200', async () => {

        const response = await request(app)
            .put('/api/admin/course/update/' + course_id)
            .set(commonHeaders)
            .send({
                "name": "d",
                "description": "desc"
            })
        console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();

    })
})

describe('Delete One Course', () => {
    test('should respond with 200', async () => {

        const response = await request(app)
            .delete('/api/admin/course/delete/' + course_id)
            .set(commonHeaders)
            .send({})

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    })
})
