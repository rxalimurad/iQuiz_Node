const express = require('express')()
const quizRouter = require('./routes/route.quiz')
const questionRouter = require('./routes/route.question')
const userRouter = require('./routes/route.user')
const historyRouter = require('./routes/route.history')

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
express.use('/api/v1/question', questionRouter);
express.use('/api/v1/user', userRouter);
express.use('/api/v1/history', historyRouter);




connectDB()
const PORT = process.env.PORT || 6969;

express.listen(PORT, () => {
    console.log('Server Started');
});
