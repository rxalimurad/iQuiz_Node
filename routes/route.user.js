const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.user');


// router.route('/:id')
// .get(controller.fetchQuiz)
// .delete(controller.deleteQuiz)

// router.route('/bulkUpload')
// .post(controller.uploadBulkQuizData)



router.route('/')
.post(controller.loginUser)

router.route('/getUser')
.get(controller.getLoginUser)

module.exports = router;
