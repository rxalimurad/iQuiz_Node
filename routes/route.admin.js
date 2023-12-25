const express = require("express");
const controller = require("../controllers/controller.admin");


const router = express.Router();

router.route('/create')
.post(controller.createAdminUser)

router.route('/login')
.post(controller.loginAdmin)

router.route('/')
.get(controller.redirectToLogin)

router.route('/home')
.get(controller.redirectToHome)

router.route('/quizQuestions/:id')
.get(controller.redirectToQuiz)
router.route('/categoryQuiz/:id')
.get(controller.redirectToCategoryQuiz)


router.route('/user')
.get(controller.redirectToAllUser)


module.exports = router;
