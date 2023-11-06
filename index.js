const express = require('express')()
const quizRouter = require('./routes/route.quiz')
const categoryRouter = require('./routes/route.category')
const userRouter = require('./routes/route.user')

const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db')


// Load env vars
dotenv.config({ path: './config/config.env' });

express.use(fileUpload());
express.use(bodyParser.json());
express.use(require('express').static('public'));

express.use('/api/v1/quiz', quizRouter);
express.use('/api/v1/category', categoryRouter);
express.use('/api/v1/user', userRouter);

connectDB()
const PORT = process.env.PORT || 6969;

express.listen(PORT, () => {
    console.log('Server Started');
});

