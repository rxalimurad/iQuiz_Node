const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.history');
const { route } = require('./route.quiz');


router.route('/:id')
.post(controller.addHistory)

router.route('/')
.get(controller.fetchHistory)


module.exports = router;
