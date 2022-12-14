const express = require('express');
const { isValidAdminJWTToken } = require('../authentication/authMiddlewares');
const StudentController = require('../controllers/studentController');
const studentController = new StudentController();

const adminStudentRouter = express.Router()

adminStudentRouter.use(isValidAdminJWTToken);

adminStudentRouter.get('/list', studentController.list);
adminStudentRouter.post('/add', studentController.add)
adminStudentRouter.get('/get/:id', studentController.get)
adminStudentRouter.put('/update/:id', studentController.update)
adminStudentRouter.delete('/delete/:id', studentController.delete)
adminStudentRouter.get('/registered/:course_id', studentController.getRegistered)

module.exports = adminStudentRouter;