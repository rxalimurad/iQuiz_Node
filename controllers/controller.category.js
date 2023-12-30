const Category = require('../models/model.category');
const asyncHandler = require('../middlewares/middleware.async');
const ErrorResponse = require('../utils/errorResponse'); 


exports.fetchAllCategory = asyncHandler(async (req, res, next) => {

  
        let data = await Category.find().populate('quizzes');
        if (!data) {
            return next(new ErrorResponse(`no category found`), 404)
        }
        data = data.map((category) => {
            return {
                _id: category._id,
                name: category.name,
                count: category.quizzes.length,
                quizzes: category.quizzes,
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