const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');


//Loading env variables
dotenv.config({ path: './config/config.env' });

// Loading Model
const Quiz = require('./models/model.quiz');

// Conecting to Mongo
const conn =  mongoose.connect(process.env.MONGO_URL);

console.log(`MongoDB connected`);

// Reading JSON files
const quizs = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/A.json`, 'utf-8')
  );

  // Importing data into DB
const importData = async () => {
    try {
      await Quiz.create(quizs);
   
      console.log('Data Imported...'.green.inverse);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  };

  importData();