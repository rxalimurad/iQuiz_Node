const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.user');

router.route('/')
.post(controller.loginUser)

router.route('/getUser')
.get(controller.getLoginUser)

module.exports = router;
