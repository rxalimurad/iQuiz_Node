const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.quiz');


router.route('/')
.get(controller.fetchAllQuiz)
.post(controller.addQuiz)
.put(controller.updateQuiz)

router.route('/:id')
.delete(controller.deleteQuiz)
.get(controller.fetchAllQuiz)

module.exports = router;
