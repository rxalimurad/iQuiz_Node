const mongoose = require('mongoose');

const Quiz = new mongoose.Schema(
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

  Quiz.set('toJSON', {
    virtuals: true
  });
  Quiz.set('toObject', {
    virtuals: true
  });

  Quiz.virtual('questions', {
    ref: 'Question',
    localField: '_id',
    foreignField: 'quizId',
    justOne: false
  });
  Quiz.virtual('history', {
    ref: 'History',
    localField: '_id',
    foreignField: 'quiz',
    justOne: false
  });




  

  module.exports = mongoose.model('Quiz', Quiz);