const express = require('express')()
const quizRouter = require('./routes/route.quiz')
const categoryRouter = require('./routes/route.category')

const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db')

// Set EJS as the view engine
express.set('view engine', 'ejs');

// Load env vars
dotenv.config({ path: './config/config.env' });

express.use(fileUpload());
express.use(bodyParser.json());

express.use('/api/v1/quiz', quizRouter);
express.use('/api/v1/category', categoryRouter);

connectDB()
const PORT = process.env.PORT || 6969;

express.listen(PORT, () => {
    console.log('Server Started');
});
