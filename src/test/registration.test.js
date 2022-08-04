const request = require('supertest')

const app = require('../app');
let commonHeaders = {
    authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsIm5hbWUiOm51bGwsImlhdCI6MTY1OTU5NTg3MH0.Kd6yVys8bMmUiHtbvxB_-vm1tnK0fVBh-rNYL6bHHhY"
}
let student_id;
let course_id;
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

// create student
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


describe('student register to a course', () => {
    test('should respond with 200', async () => {
        const response = await request(app)
            .post('/api/student/register')
            .set(commonHeaders)
            .send({
                "student_id": student_id,
                "course_id": course_id
            })

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(typeof response.body.id).toBe("number");
        student_id = response.body.id;
    })
});
