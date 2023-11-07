const { func } = require("joi");
const History = require("../models/model.history");
const User = require("../models/model.user");
const Quiz = require("../models/model.quiz");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middlewares/middleware.async");
const ErrorResponse = require('../utils/errorResponse'); 

exports.addHistory = asyncHandler(async(req, res, next) => {
  if (req.headers.authorization === undefined) {
    return next(new ErrorResponse(`Unauthorized`, 401))
}
    let quizID = req.body.quizID;
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ phone: decoded.phone });
    const category = await Quiz.findById(quizID).populate("questions");
    let anwsers = req.body.anwsers;
    if (anwsers.length === category.questions.length) {
      let history = await History.create({
        user: user._id,
        quiz: quizID,
        anwsers: req.body.anwsers,
      });
      res.status(201).json({
        success: true,
        data: history,
      });
    } else {
      return next(new ErrorResponse(`Input anwsers not match with questions`), 401)
    }
  
});

exports.fetchAllHistory = asyncHandler(async(req, res, next) => {
  if (req.headers.authorization === undefined) {
    return next(new ErrorResponse(`Unauthorized`, 401))
}
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ phone: decoded.phone }).populate({
      path: "histories",
      populate: {
        path: "quiz",
        model: "Quiz",
        populate: {
          path: "questions",
          model: "Question",
        },
      },
    });
    let histories = user.histories;
    let selectedAnwers = histories.map((history) => history.anwsers);
    let anwsers = histories.map((history) =>
      history.quiz.questions.map((quiz) => quiz.correctAnswer)
    );
    let name = histories.map((history) => history.quiz.name);
    let timestamp = histories.map((history) => history.timestamp);

    let zippedArray = selectedAnwers.map((selectedAnswer, index) => {
      return {
        id: histories[index]._id,
        name: name[index],
        correct: countMatchingElements(selectedAnwers[index], anwsers[index]),
        totalQuestions: selectedAnswer.length,
        timestamp: timestamp[index],
      };
    });
    res.status(200).json({ results: zippedArray });
 
  function countMatchingElements(arr1, arr2) {
    let count = 0;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] === arr2[i]) {
        count++;
      }
    }
    return count;
  }
});

exports.fetchDetailHistory = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization === undefined) {
    return next(new ErrorResponse(`Unauthorized`, 401))
}
  let token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(token, process.env.JWT_SECRET);
  let quizID = req.params.id;
  let history = await History.findOne({ _id: quizID })
    .populate("user")
    .populate({
      path: "quiz",
      populate: {
        path: "questions",
      },
    });
  let zippedArray = history.quiz.questions.map((question, index) => {
      return {
          question: question.question,
          isCorrect: history.quiz.questions[index].correctAnswer === history.anwsers[index],
          correct: history.quiz.questions[index].options[getCorrectAnswer(history.quiz.questions[index].correctAnswer) - 1],
          selected: history.quiz.questions[index].options[getCorrectAnswer(history.anwsers[index]) - 1],
      }
  });

  res.status(200).json({
    id: history._id,
    results: zippedArray,
  });
});

function getCorrectAnswer(character) {
    const charCode = character.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) { // Uppercase letters (A-Z)
      return charCode - 64;
    } else if (charCode >= 97 && charCode <= 122) { // Lowercase letters (a-z)
      return charCode - 96;
    } else {
      return 0
    }
}
