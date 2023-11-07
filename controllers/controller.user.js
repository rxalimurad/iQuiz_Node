const User = require('../models/model.user');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middlewares/middleware.async');
const ErrorResponse = require('../utils/errorResponse'); 
exports.loginUser = asyncHandler(async (req, res, next) => {

    let user = await User.findOne({ phone: req.body.phone });
    if (!user) {
        user = await User.create(req.body);
    }
    let token = jwt.sign({ phone: user.phone }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
    res.status(200).json({ success: true, token: token, user: user, message: "Login successful" })


})

exports.changeName = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization === undefined) {
        return next(new ErrorResponse(`Unauthorized`, 401))
    }
    const token = req.headers.authorization.split(' ')[1] || "";
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.updateOne({ phone: decoded.phone }, { name: req.body.name })
    res.status(200).json({ success: true, details: user, message: "Name Change successful" })
})


exports.getLoginUser = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization === undefined) {
        return next(new ErrorResponse(`Unauthorized`, 401))
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ phone: decoded.phone });
    res.status(200).json({ success: true, user: user })

})