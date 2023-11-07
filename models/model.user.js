const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {

      name: {
        type: String,
        trim: true,
        required: [true, 'Please add a name'],
      },
      imageName: {
        type: String,
        trim: true,
      },
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

  User.set('toJSON', {
    virtuals: true
  });
  User.set('toObject', {
    virtuals: true
  });

  
  User.virtual('histories', {
    ref: 'History',
    localField: '_id',
    foreignField: 'user',
    justOne: false
  });


  module.exports = mongoose.model('User', User);