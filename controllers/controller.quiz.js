const Quiz = require('../models/model.quiz');
const asyncHandler = require('../middlewares/middleware.async');
const ErrorResponse = require('../utils/errorResponse'); 
exports.fetchAllQuiz = asyncHandler(async (req, res, next) => {
    let data = await Quiz.find().populate('questions');
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
    const category = await Quiz.findByIdAndDelete(req.params.id);
    if (category.deletedCount === 0) {
        return next(new ErrorResponse(`no quiz found`), 404)
    }
    res.status(200).json({
        success: true,
        message: 'Quiz deleted successfully',
    });
})
