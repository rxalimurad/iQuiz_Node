const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.quiz');


router.route('/:id')
.get(controller.fetchQuiz)
.delete(controller.deleteQuiz)

router.route('/bulkUpload')
.post(controller.uploadBulkQuizData)

router.route('/')
.post(controller.uploadQuizData)

module.exports = router;
