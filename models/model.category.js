const mongoose = require('mongoose');

const Category = new mongoose.Schema(
    {
      id: {
        type: String,
        required: [true, 'Please add a id'],
        unique: true,
      },
      name: {
        type: String,
        required: [true, 'Please add a name'],
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
    
  );

  module.exports = mongoose.model('Category', Category);