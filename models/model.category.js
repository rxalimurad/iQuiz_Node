const mongoose = require('mongoose');

const Category = new mongoose.Schema(
    {

      name: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Please add a name'],
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
    
  );

  Category.set('toJSON', {
    virtuals: true
  });
  Category.set('toObject', {
    virtuals: true
  });

  Category.virtual('quizzes', {
    ref: 'Quiz',
    localField: '_id',
    foreignField: 'categoryId',
    justOne: false
  });

  

  module.exports = mongoose.model('Category', Category);