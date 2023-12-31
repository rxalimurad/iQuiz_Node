const asyncHandler = require("../middlewares/middleware.async");
const { default: axios } = require("axios");
const crypto = require("crypto");
const User = require("../models/model.user");
const jwt = require("jsonwebtoken");


exports.createAdminUser = asyncHandler(async (req, res, next) => {
  try {
    let password = req.body.password;
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    let user = await User.create({
      phone: req.body.username,
      password: hashedPassword,
      role: "admin",
    });
    res.status(200).json({ success: true, message: "Admin user created" });
  } catch (error) {
    res.status(500).send(`Error fetching data ${error}`);
  }
});

exports.changePassword = asyncHandler(async (req, res, next) => {
  try {
    let password = req.body.newPassword;
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
    let user = await User.updateOne(
      { phone: req.body.username, role: "admin" },
      { password: hashedPassword }
    );
    res.status(200).json({ success: true, message: "Password changed" });
  } catch (error) {
    res.status(500).send(`Error fetching data ${error}`);
  }

})
exports.loginAdmin = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body);
    let user1 = await User.find({
      role: "admin",
      phone: req.body.username,
      password: req.body.password,
    });
    if (user1.length == 0 && req.body.username === "admin" && req.body.password === "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918") {
      const hashedPassword = crypto
        .createHash("sha256")
        .update("admin")
        .digest("hex");
      let user = await User.create({
        phone: req.body.username,
        password: hashedPassword,
        role: "admin",
      });
      console.log(user);
    }
    let user = await User.find({
      role: "admin",
      phone: req.body.username,
      password: req.body.password,
    });
    if (user.length > 0) {
      let token = jwt.sign(
        {
          role: "admin",
          phone: req.body.username,
          password: req.body.password,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );
      res
        .status(200)
        .json({ success: true, token: token, message: "Login successful" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Admin user does not exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error fetching data ${error}`);
  }
})

exports.redirectToChangePassword = asyncHandler(async (req, res, next) => {
  try {
    // Render the EJS view and pass the received data
    res.render("changePassword", {
      title: "Change Password",
      serverURL: req.protocol + "://" + req.get("host"),
    });
  } catch (error) {
    // Handle errors
    res.status(500).send(`Error fetching data ${error}`);
  }
})
exports.redirectToLogin = asyncHandler(async (req, res, next) => {
  try {
    // Render the EJS view and pass the received data
    res.render("login", {
      title: "Login",
      serverURL: req.protocol + "://" + req.get("host"),
    });
  } catch (error) {
    // Handle errors
    res.status(500).send(`Error fetching data ${error}`);
  }
})
exports.redirectToCategoryQuiz = asyncHandler(async (req, res, next) => {
  try {
    // Fetch data from the API endpoint
    const currentURL =
      req.protocol + "://" + req.get("host") + "/api/v1/quiz/" + req.params.id;
    const response = await axios.get(currentURL);
    console.log(response.data.data);
    // Render the EJS view and pass the received data
    res.render("quizList", {
      title: "Quiz List",
      catId: req.params.id,
      data: response.data.data,
      serverURL: req.protocol + "://" + req.get("host"),
    });
  } catch (error) {
    // Handle errors
    res.status(500).send(`Error fetching data ${error}`);
  }
})
exports.redirectToHome = asyncHandler(async (req, res, next) => {
  try {
    // Fetch data from the API endpoint
    const currentURL =
      req.protocol + "://" + req.get("host") + "/api/v1/category";
    const response = await axios.get(currentURL);
    console.log(response.data.data);
    // Render the EJS view and pass the received data
    res.render("categoryList", {
      title: "categories List",
      data: response.data.data,
      serverURL: req.protocol + "://" + req.get("host"),
    });
  } catch (error) {
    // Handle errors
    res.status(500).send(`Error fetching data ${error}`);
  }
})

exports.redirectToQuiz = asyncHandler(async (req, res, next) => {
  try {
    // Fetch data from the API endpoint
    const currentURL =
      req.protocol +
      "://" +
      req.get("host") +
      "/api/v1/question/" +
      req.params.id;
    const response = await axios.get(currentURL);
    res.render("quizQuestions", {
      title: "Quiz Questions",
      questions: response.data.data,
      quizId: req.params.id,
      serverURL: req.protocol + "://" + req.get("host"),
    });
  } catch (error) {
    // Handle errors
    res.status(500).send(`Error fetching data ${error}`);
  }
})

exports.redirectToAllUser = asyncHandler(async (req, res, next) => {
  try {
    // Fetch data from the API endpoint
    const currentURL =
      req.protocol + "://" + req.get("host") + "/api/v1/user";
    const response = await axios.get(currentURL);
    // Render the EJS view and pass the received data
    res.render("userList", {
      title: "User List",
      data: response.data.data,
      serverURL: req.protocol + "://" + req.get("host"),
    });
  } catch (error) {
    // Handle errors
    res.status(500).send(`Error fetching data ${error}`);
  }
})