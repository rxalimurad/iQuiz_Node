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
    foreignField: 'questionId',
    justOne: false
  });




  

  module.exports = mongoose.model('Category', Quiz);