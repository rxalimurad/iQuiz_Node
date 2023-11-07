const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.question');

router.route('/:id')
.get(controller.fetchQuestions)
.delete(controller.deleteQuestion)

router.route('/bulkUpload')
.post(controller.uploadBulkQuestionsData)

router.route('/')
.post(controller.uploadQuestionData)

module.exports = router;
