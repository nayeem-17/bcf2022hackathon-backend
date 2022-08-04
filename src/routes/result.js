const express = require('express');
const { isValidAdminJWTToken } = require('../authentication/authMiddlewares');
const AdminController = require('../controllers/adminController');
const adminController = new AdminController()
const resultRouter = express.Router()

resultRouter.post("/add", isValidAdminJWTToken, adminController.addResult)

module.exports = resultRouter;