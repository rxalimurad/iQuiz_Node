const Report = require('../models/model.report');
const asyncHandler = require('../middlewares/middleware.async');
const ErrorResponse = require('../utils/errorResponse'); 
exports.report = asyncHandler(async (req, res, next) => {
    const report = await Report.create(req.body);
    res.status(201).json({ success: true, message: "Reported successfully" })

})