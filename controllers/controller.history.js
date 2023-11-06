const { func } = require('joi');
const History = require('../models/model.history');
const User = require('../models/model.user');
const Category = require('../models/model.category');
const jwt = require('jsonwebtoken');





exports.addHistory = async (req, res, next) => {
    try {
        let categoryId = req.params.id;
        let token = req.headers.authorization.split(' ')[1];
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ phone: decoded.phone });
        const category = await Category.findById(categoryId).populate('quizzes');
        let anwsers = req.body.anwsers.split(',')
        if (anwsers.length === category.quizzes.length) {
             let history = await History.create({user: user._id, category: category._id, anwsers: req.body.anwsers});
             res.status(201).json({
                success: true,
                data: history,
            });
        } else {
            res.status(400).send("Input anwsers not match with quizzes");
        }
    } catch(err) {
        if(err.constructor.name === "JsonWebTokenError") {
            return res.status(401).json("Unauthorized")
        } else {
            return res.status(404).json("Resource not found " + err)
        }
    }
}

exports.fetchHistory = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ phone: decoded.phone }).populate('histories')
        res.status(200).json(user)

        
    } catch(err) {
        if(err.constructor.name === "JsonWebTokenError") {
            return res.status(401).json("Unauthorized")
        } else {
            return res.status(404).json("Resource not found " + err)
        }
    }
}