const express = require('express');
const { getAccessToken } = require('../authentication/authControllers');
const { login } = require('../authentication/authMiddlewares');

const AdminController = require('../controllers/adminController');
const adminCourseRouter = require('./adminCourse');
const adminController = new AdminController();

const adminRouter = express.Router()

adminRouter.post('/create', adminController.create);
adminRouter.post('/login', login, getAccessToken);

adminRouter.use("/course", adminCourseRouter)


module.exports = adminRouter;