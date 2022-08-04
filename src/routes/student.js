const express = require('express');
const StudentController = require('../controllers/studentController');
const studentController = new StudentController()
const studentRouter = express.Router()

studentRouter.post('/register', studentController.register);
studentRouter.get('/get-result', studentController.getResult)
module.exports = studentRouter;