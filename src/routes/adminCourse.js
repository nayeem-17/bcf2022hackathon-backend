const express = require('express');
const { isValidAdminJWTToken } = require('../authentication/authMiddlewares');
const CourseController = require('../controllers/CourseController');
const courseController = new CourseController();
const adminCourseRouter = express.Router()

adminCourseRouter.use(isValidAdminJWTToken);
adminCourseRouter.get('/list', courseController.list);
adminCourseRouter.post('/add', courseController.add)
adminCourseRouter.post('/update/:id', courseController.update)
adminCourseRouter.delete('/delete/:id', courseController.delete)
module.exports = adminCourseRouter;