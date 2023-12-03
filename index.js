const express = require('express')()
const quizRouter = require('./routes/route.quiz')
const questionRouter = require('./routes/route.question')
const userRouter = require('./routes/route.user')
const historyRouter = require('./routes/route.history')
const reportRouter = require('./routes/route.report')
const adminRouter = require('./routes/route.admin')
const errorHandler = require('./middlewares/middleware.error')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db')
const logger = require('pino')()


// Load env vars
dotenv.config({ path: './config/config.env' });
express.set('views', __dirname + '/views');
// Set EJS as the templating engine
express.set('view engine', 'ejs');

express.use(fileUpload());
express.use(bodyParser.json());
express.use(require('express').static('public'));

express.use('/api/v1/quiz', quizRouter);
express.use('/api/v1/question', questionRouter);
express.use('/api/v1/user', userRouter);
express.use('/api/v1/history', historyRouter);
express.use('/api/v1/report', reportRouter);
express.use('/admin', adminRouter);
express.use(errorHandler)



connectDB()
const PORT = process.env.PORT || 6969;
express.use((req, res) => {
    res.status(404).send('Not Found');
  });
express.listen(PORT, () => {
    console.log('Server Started');
});

