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

  Category.virtual('quizzes', {
    ref: 'Quiz',
    localField: '_id',
    foreignField: 'category',
    justOne: false
  });

  Category.set('toJSON', {
    virtuals: true
  });
  Category.set('toObject', {
    virtuals: true
  });

  

  module.exports = mongoose.model('Category', Category);