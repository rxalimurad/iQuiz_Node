const { func } = require("joi");
const History = require("../models/model.history");
const User = require("../models/model.user");
const Quiz = require("../models/model.quiz");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middlewares/middleware.async");
const ErrorResponse = require("../utils/errorResponse");

exports.addHistory = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization === undefined) {
    return next(new ErrorResponse(`Unauthorized`, 401));
  }
  let quizID = req.body.quiz;
  let token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ phone: decoded.phone });

  const category = await Quiz.findById(quizID).populate("questions");

  let answers = req.body.answers;
  if (answers.length === category.questions.length) {
    let history = await History.create({
      quiz: quizID,
      answers: answers,
      user: user._id,
    })

    let histtoryP = await history.populate('answers.question')
      let correct = histtoryP.answers.filter((anwser, index) => {
        return anwser.selectedOption === anwser.question.correctAnswer
      })
      let unanswered = history.answers.filter((anwser, index) => {
        return anwser.selectedOption === 'N/A'
      })
    
      let result = {
        id: history._id,
        quiz: history.quiz.name,
        correct: correct.length,
        unanswered: unanswered.length,
        total: history.answers.length,
        timestamp: history.timestamp,
      };
    res.send({result: result})

  } else {
    return next(
      new ErrorResponse(`Input anwsers not match with questions`),
      401
    );
  }
});

exports.fetchAllHistory = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization === undefined) {
    return next(new ErrorResponse(`Unauthorized`, 401));
  }
  let token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ phone: decoded.phone }).populate({
    path: 'histories',
    populate: [
      {
        path: 'quiz',
        model: 'Quiz'
      },
      {
        path: 'answers.question', 
        model: 'Question'
      }
    ],
  });
  let histories = user.histories

  let zip = histories.zippedArray = histories.map((history, index) => {
    let correct = history.answers.filter((anwser, index) => {
      console.log("------- ----")
      console.log(anwser)
      return anwser.selectedOption === anwser.question.correctAnswer
    })
    let unanswered = history.answers.filter((anwser, index) => {
      return anwser.selectedOption === 'N/A'
    })
    console.log("------- ----" + correct)
    return {
      id: history._id,
      quiz: history.quiz.name,
      correct: correct.length,
      unanswered: unanswered.length,
      total: history.answers.length,
      timestamp: history.timestamp,
    };
  })
  zip = zip.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });
  res.status(200).json({ histories: zip });
});

exports.fetchHistory = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization === undefined) {
    return next(new ErrorResponse(`Unauthorized`, 401));
  }
  console.log(req.params.id)
  let token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ phone: decoded.phone }).populate({
    path: 'histories',
    populate: [
      {
        path: 'quiz',
        model: 'Quiz'
      },
      {
        path: 'answers.question', 
        model: 'Question'
      }
    ],
  });
 
  let histories = user.histories.filter((history, index) => {
    return history.id == req.params.id
  })

  console.log(histories)
  let zip = histories.zippedArray = histories.map((history, index) => {
    let correct = history.answers.filter((anwser, index) => {
      console.log("------- ----")
      console.log(anwser)
      return anwser.selectedOption === anwser.question.correctAnswer
    })
    let unanswered = history.answers.filter((anwser, index) => {
      return anwser.selectedOption === 'N/A'
    })
    console.log("------- ----" + correct)
    return {
      id: history._id,
      quiz: history.quiz.name,
      correct: correct.length,
      unanswered: unanswered.length,
      total: history.answers.length,
      timestamp: history.timestamp,
    };
  })
  zip = zip.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });
  res.status(200).json({ histories: zip });
});

exports.fetchDetailHistory = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization === undefined) {
    return next(new ErrorResponse(`Unauthorized`, 401));
  }
  let token = req.headers.authorization.split(" ")[1];
  let decoded = jwt.verify(token, process.env.JWT_SECRET);
  let quizID = req.params.id;
  let history = await History.findOne({ _id: quizID })
    .populate("user")
    .populate([
      {
        path: 'quiz',
        model: 'Quiz'
      },
      {
        path: 'answers.question', 
        model: 'Question'
      }
    ]);
  let zippedArray = history.answers.map((anwser, index) => {
    return {
      question: anwser.question.question,
      isCorrect: anwser.selectedOption === null ? null : anwser.selectedOption === anwser.question.correctAnswer ? true : false,
      correct:
      anwser.question.options[
        getCorrectAnswer(anwser.question.correctAnswer) - 1
        ],
      selected:
      anwser.question.options[
        getCorrectAnswer(history.answers[index].selectedOption) - 1
        ],
    };
  });

  

  res.status(200).json({
    id: history._id,
    details: zippedArray,
  });
});

function getCorrectAnswer(character) {
  const charCode = character.charCodeAt(0);
  if (charCode >= 65 && charCode <= 90) {
    // Uppercase letters (A-Z)
    return charCode - 64;
  } else if (charCode >= 97 && charCode <= 122) {
    // Lowercase letters (a-z)
    return charCode - 96;
  } else {
    return 0;
  }
}
