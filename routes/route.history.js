const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.history');
const { route } = require('./route.quiz');


router.route('/:id')
.post(controller.addHistory)
.get(controller.fetchDetailHistory)

router.route('/')
.get(controller.fetchAllHistory)


module.exports = router;
