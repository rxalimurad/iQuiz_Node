const Joi = require('joi');
const Quiz = require('../models/model.quiz');


exports.fetchQuiz = async (req, res, next) => {
    try {
        const filter = { categoryId: req.params.id }; 
        const quiz = await Quiz.find(filter)

        res.status(200).json({count: quiz.length, data: quiz})
    } catch (err) {
        res.status(404).json({ error: err })
    }
}


exports.uploadBulkQuizData = async (req, res, next) => {
  
    try {
        const questionSchema = Joi.object({
            categoryId: Joi.string().required(),
            question: Joi.string().required(),
            options: Joi.array().items(Joi.string()).required(),
            correctAnswer: Joi.string().valid('A', 'B', 'C', 'D', 'E').required()
        });
        const schema = Joi.array().items(questionSchema);
        
        const jsonData = JSON.parse(req.files.dataFile.data.toString('utf8'));

        const { error } = schema.validate(jsonData);
        if (error) {
            return res.status(401).send("Bad format");
        }

        const quiz = await Quiz.create(jsonData);

        res.status(201).json({
            success: true,
            data: quiz
        });


    } catch (e) {
        return res.status(401).send("Bad format:" + e);
    }

}

exports.uploadQuizData = async (req, res, next) => {
  
    try {
        const quiz = await Quiz.create(req.body);
        res.status(201).json({
          success: true,
          data: quiz,
        });

    } catch (e) {
        return res.status(401).send("Bad format:" + e);
    }

}

exports.deleteQuiz = async (req, res, next) => {
    try {
        
        const quiz = await Quiz.findByIdAndDelete(req.params.id);

        if (quiz.deletedCount === 0) {
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