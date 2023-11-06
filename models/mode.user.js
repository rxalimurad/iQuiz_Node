const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {

      phone: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Please add a phone number'],
      },
      role: {
        type: String,
        required: [true, 'Please add a role'],
        enum: ['admin', 'user'],
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
    
  );


  module.exports = mongoose.model('User', User);