const mongoose = require('mongoose');


const Report = new mongoose.Schema({

      message: {
        type: String,
        required: [true, 'Please add message'],
      },

      phone: {
        type: String,
      },
     
     
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
);




  module.exports = mongoose.model('Report', Report);