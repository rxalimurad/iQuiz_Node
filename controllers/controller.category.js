const Category = require('../models/model.category');
const asyncHandler = require('../middlewares/middleware.async');
const ErrorResponse = require('../utils/errorResponse'); 


exports.fetchAllCategory = asyncHandler(async (req, res, next) => {

  
    let data = await Category.find().populate({
        path: 'quizzes',
        populate: { path: 'questions' }
    });
        if (!data) {
            return next(new ErrorResponse(`no category found`), 404)
        }
        data = data.map((category) => {
            let quizzesWithTotalQuestions = category.quizzes.map((quiz) => {
                const questionIds = quiz.questions;
                const totalQuestions = questionIds.length;
            
                return {
                    ...quiz._doc,
                    totalQuestions
                };
            });
            
            console.log(quizzesWithTotalQuestions);
            return {
                id: category._id,
                name: category.name,
                count: category.quizzes.length,
                quizzes: quizzesWithTotalQuestions,
                timestamp: category.timestamp,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            }
        })
        res.status(200).json({ success: true, count: data.length, data: data})
   
})


exports.addCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.create(req.body);
    res.status(201).json({
        success: true,
        data: category,
    })
})  

exports.updateCategory = asyncHandler(async (req, res, next) => {
        const quiz = await Category.findByIdAndUpdate(req.body.categoryId, req.body, {
            new: true,
            runValidators: true
        });
        if (!quiz) {
            return next(new ErrorResponse(`no category found`), 404)
        }
        res.status(200).json({
            success: true,
            data: quiz,
        });
    })

exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (category.deletedCount === 0) {
        return next(new ErrorResponse(`no category found`), 404)
    }
    res.status(200).json({
        success: true,
        data: {},
    });
})