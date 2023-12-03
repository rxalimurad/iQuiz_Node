const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.report');


router.route('/')
.post(controller.report)

module.exports = router;
