const mongoose = require('mongoose');

const History = new mongoose.Schema({

      anwsers: {
        type: [String],
        required: [true, 'Please add Answers list'],
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category'
        },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
);


  module.exports = mongoose.model('History', History);