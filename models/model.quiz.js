const mongoose = require('mongoose');

const Quiz = new mongoose.Schema(
    {
      question: {
        type: String,
        required: [true, 'Please add a question'],
        unique: true,
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
      categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      },
    }
    
  );

  module.exports = mongoose.model('Quiz', Quiz);