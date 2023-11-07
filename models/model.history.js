const mongoose = require('mongoose');

const History = new mongoose.Schema({

      anwsers: {
        type: [String],
        required: [true, 'Please add Answers list'],
        enum: [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F'
        ]
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      quiz: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Quiz'
        },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
);


  module.exports = mongoose.model('History', History);