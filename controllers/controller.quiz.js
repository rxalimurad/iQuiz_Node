const Quiz = require('../models/model.quiz');
const asyncHandler = require('../middlewares/middleware.async');
const Question = require('../models/model.question');
const ErrorResponse = require('../utils/errorResponse'); 
const jwt = require("jsonwebtoken");
const User = require('../models/model.user');

exports.fetchAllQuiz = asyncHandler(async (req, res, next) => {

    if (req.headers.authorization) {
        let token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findOne({ phone: decoded.phone }).populate('histories');
        let histories = user.histories;
        console.log(histories);
        let data = await Quiz.find().populate('questions').populate('history');
        if (!data) {
            return next(new ErrorResponse(`no quiz found`), 404)
        }
        //quiz.history.length === 0 ? null : quiz.history[quiz.history.length - 1].id,
        const formattedData = data.map(quiz => ({
            _id: quiz._id,
            name: quiz.name,
            attempted: histories.length !== 0 ? histories[histories.length - 1].id : null,
            timestamp: quiz.timestamp,
            totalQuestions: quiz.questions.length,
            id: quiz.id
        }));

res.status(200).json({ success: true, count: data.length, data: formattedData })

    } else {
        let data = await Quiz.find().populate('questions').populate('history');
        if (!data) {
            return next(new ErrorResponse(`no quiz found`), 404)
        }
        const formattedData = data.map(quiz => ({
            _id: quiz._id,
            name: quiz.name,
            timestamp: quiz.timestamp,
            totalQuestions: quiz.questions.length,
            id: quiz.id
        }));
        res.status(200).json({ success: true, count: data.length, data: formattedData })
    }
})



exports.addQuiz = asyncHandler(async (req, res, next) => {
    const quiz = await Quiz.create(req.body);
    res.status(201).json({
        success: true,
        data: quiz,
    });
})

exports.updateQuiz = asyncHandler(async (req, res, next) => {
    const quiz = await Quiz.findByIdAndUpdate(req.body.quizId, req.body, {
        new: true,
        runValidators: true
    });
    if (!quiz) {
        return next(new ErrorResponse(`no quiz found`), 404)
    }
    res.status(200).json({
        success: true,
        data: quiz,
    });
})

exports.deleteQuiz = asyncHandler(async (req, res, next) => {
   await Question.deleteMany({ quizId: req.params.id });
    const category = await Quiz.findByIdAndDelete(req.params.id);
    if (category.deletedCount === 0) {
        return next(new ErrorResponse(`no quiz found`), 404)
    }
    res.status(200).json({
        success: true,
        message: 'Quiz deleted successfully',
    });
})
