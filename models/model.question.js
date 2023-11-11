const mongoose = require('mongoose');

const Question = new mongoose.Schema(
    {
      question: {
        type: String,
        required: [true, 'Please add a question'],
        trim: true,
      },
      options: {
        type: [String],
        required: true,
      },
      correctAnswer: {
        type: String,
        enum: [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F'
          ]
        
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
      },
    }
    
  );

  module.exports = mongoose.model('Question', Question);