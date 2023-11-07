const Quiz = require('../models/model.quiz');


exports.fetchAllQuiz = async (req, res, next) => {
   try {
    let data = await Quiz.find();
    if (!data) {
        return res.status(404).json("Resource not found")
    }
    console.log(data)
     res.status(200).json({count: data.length, data: data})
   } catch(err) {
    return res.status(404).json("Resource not found " + err)
   }
}

exports.addQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.create(req.body);
        res.status(201).json({
          success: true,
          data: quiz,
        });
    } catch(err) {
        console.log(err)
     return res.status(401).json("Bad request"+ err)
    }
 }
 
 exports.updateQuiz = async (req, res, next) => {
    try {
        
        const quiz = await Quiz.findByIdAndUpdate(req.body.questionId, req.body, {
            new: true,
            runValidators: true
          });
          if (!quiz) {
            return res.status(401).json("Quiz not found")
        }
          res.status(200).json({
            success: true,
            data: quiz,
          });
    } catch(err) {
        console.log(err)
     return res.status(401).json(req.params.id+" Bad request: "+ err)
    }
 }

 exports.deleteQuiz = async (req, res, next) => {
    try {
        
        const category = await Quiz.findByIdAndDelete(req.params.id);

        if (category.deletedCount === 0) {
            return res.status(401).json(req.params.id+" Bad request: ")
        }

        res.status(200).json({
            success: true,
            message: 'Quiz deleted successfully',
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ success: false, error: 'Server Error'+err });
    }
}
