var express = require('express');
const IndexController = require('../controllers/indexController');
const indexController = new IndexController();

var router = express.Router();

/* GET home page. */
router.get('/', indexController.helloWorld);

module.exports = router;
