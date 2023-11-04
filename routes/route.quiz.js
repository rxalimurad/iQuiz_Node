const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.quiz');


router.route('/:id')
.get(controller.fetchQuiz)

router.route('/upload')
.post(controller.uploadQuizData)

module.exports = router;
