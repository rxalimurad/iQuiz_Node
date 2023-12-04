const express = require('express');
const asyncHandler = require('../middlewares/middleware.async');
const { default: axios } = require('axios');
const router = express.Router();

router.get('/', asyncHandler(async(req, res, next) => {
    try {
        // Fetch data from the API endpoint
        const currentURL = req.protocol + '://' + req.get('host') + '/api/v1/quiz';
        console.log(currentURL);
        const response = await axios.get(currentURL);
        // Render the EJS view and pass the received data
        res.render('quizList', { title: 'Quiz List', data: response.data.data });
      } catch (error) {
        // Handle errors
        res.status(500).send(`Error fetching data ${error}`);
      }
}));
router.get('/quizQuestions/:id', asyncHandler(async(req, res, next) => {
    try {
        // Fetch data from the API endpoint
        const currentURL = req.protocol + '://' + req.get('host') + '/api/v1/question/'+req.params.id;
        console.log(currentURL);
        const response = await axios.get(currentURL);
        res.render('quizQuestions', { title: 'Quiz Questions', questions: response.data.data, quizId: req.query.quizId });
      } catch (error) {
        // Handle errors
        res.status(500).send(`Error fetching data ${error}`);
      }
}));


module.exports = router;
