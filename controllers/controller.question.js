const Joi = require('joi');
const Question = require('../models/model.question');
const asyncHandler = require('../middlewares/middleware.async');

exports.fetchQuestions = asyncHandler(async (req, res, next) => {
    const filter = { quizId: req.params.id }; 
    const questions = await Question.find(filter)
    res.status(200).json({success: true, count: questions.length, data: questions})
})


exports.uploadBulkQuestionsData = asyncHandler(async (req, res, next) => {
    const questionSchema = Joi.object({
        quizId: Joi.string().required(),
        question: Joi.string().required(),
        options: Joi.array().items(Joi.string()).required(),
        correctAnswer: Joi.string().valid('A', 'B', 'C', 'D', 'E').required()
    });
    const schema = Joi.array().items(questionSchema);
    
    const jsonData = JSON.parse(req.files.dataFile.data.toString('utf8'));

    const { error } = schema.validate(jsonData);
    if (error) {
        return next(error);
    }

    const question = await Question.create(jsonData);

    res.status(201).json({
        success: true,
        data: question
    });

})

exports.uploadQuestionData = asyncHandler(async (req, res, next) => {
    const question = await Question.create(req.body);
        res.status(201).json({
          success: true,
          data: question,
        });

})

exports.deleteQuestion = asyncHandler(async (req, res, next) => {
    const question = await Question.findByIdAndDelete(req.params.id);

        if (question.deletedCount === 0) {
            return res.status(401).json(req.params.id+" Bad request: _id not found")
        }

        res.status(200).json({
            success: true,
            message: 'Question deleted successfully',
        });
})