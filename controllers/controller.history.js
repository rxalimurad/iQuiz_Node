const { func } = require("joi");
const History = require("../models/model.history");
const User = require("../models/model.user");
const Category = require("../models/model.category");
const jwt = require("jsonwebtoken");

exports.addHistory = async (req, res, next) => {
  try {
    let categoryId = req.params.id;
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ phone: decoded.phone });
    const category = await Category.findById(categoryId).populate("quizzes");
    let anwsers = req.body.anwsers;
    if (anwsers.length === category.quizzes.length) {
      let history = await History.create({
        user: user._id,
        category: category._id,
        anwsers: req.body.anwsers,
      });
      res.status(201).json({
        success: true,
        data: history,
      });
    } else {
      res.status(400).send("Input anwsers not match with quizzes");
    }
  } catch (err) {
    if (err.constructor.name === "JsonWebTokenError") {
      return res.status(401).json("Unauthorized");
    } else {
      return res.status(404).json("Resource not found " + err);
    }
  }
};

exports.fetchAllHistory = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ phone: decoded.phone }).populate({
      path: "histories",
      populate: {
        path: "category",
        model: "Category",
        populate: {
          path: "quizzes",
          model: "Quiz",
        },
      },
    });
    let histories = user.histories;
    let selectedAnwers = histories.map((history) => history.anwsers);
    let anwsers = histories.map((history) =>
      history.category.quizzes.map((quiz) => quiz.correctAnswer)
    );
    let name = histories.map((history) => history.category.name);
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
  } catch (err) {
    if (err.constructor.name === "JsonWebTokenError") {
      return res.status(401).json("Unauthorized");
    } else {
      return res.status(404).json("Resource not found " + err);
    }
  }
  function countMatchingElements(arr1, arr2) {
    let count = 0;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] === arr2[i]) {
        count++;
      }
    }
    return count;
  }
};

exports.fetchDetailHistory = async (req, res, next) => {
  let quizID = req.params.id;
  let history = await History.findOne({ _id: quizID })
    .populate("user")
    .populate({
      path: "category",
      populate: {
        path: "quizzes",
      },
    });

  // history.category.quizzes.map(quiz => {
  console.log(history.category.quizzes);
  // })
  let zippedArray = history.category.quizzes.map((quiz, index) => {
      return {
          question: quiz.question,
          isCorrect: history.category.quizzes[index].correctAnswer === history.anwsers[index],
          correct: history.category.quizzes[index].options[getCorrectAnswer(history.category.quizzes[index].correctAnswer) - 1],
          selected: history.category.quizzes[index].options[getCorrectAnswer(history.anwsers[index]) - 1],
      }
  });

  res.status(200).json({
    id: history._id,
    results: zippedArray,
  });
};

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
