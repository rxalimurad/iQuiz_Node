const User = require('../models/mode.user');
const jwt = require('jsonwebtoken');


exports.loginUser = async (req, res, next) => {
    try {
        let user = await User.findOne({ phone: req.body.phone });
        if (!user) {
            user = await User.create(req.body);
        }
        let token = jwt.sign({ phone: user.phone }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        res.status(200).json({success: true, token: token, role: user.role, message: "Login successful"})
    } catch(err) {
        return res.status(404).json("Resource not found " + err)
    }

}

exports.getLoginUser = async (req, res, next) => {
    //write a function to get the user from jwt token and return the user
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ phone: decoded.phone });
        res.status(200).json({success: true, data: user})
    } catch(err) {

        if(err.constructor.name === "JsonWebTokenError") {
            return res.status(401).json("Unauthorized")
        } else {
            return res.status(404).json("Resource not found " + err)
        }
    }
}