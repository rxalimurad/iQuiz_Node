const mongoose = require('mongoose');

const Answer = new mongoose.Schema({

    question: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Question is required'],
    ref: 'Question'
  },

   selectedOption: {
    type: String,
    required: [true, 'Please add Answers'],
    enum: [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'N/A'
    ]
  },
}
);

const History = new mongoose.Schema({

      quiz: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Quiz'
      },
     anwsers: {
        type: [Answer],
        required: [true, 'Please add Answers list'],
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
     
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
);




  module.exports = mongoose.model('History', History);