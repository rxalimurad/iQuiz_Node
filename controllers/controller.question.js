const Joi = require('joi');
const Question = require('../models/model.question');


exports.fetchQuestions = async (req, res, next) => {
    try {
        const filter = { quizId: req.params.id }; 
        const questions = await Question.find(filter)

        res.status(200).json({count: questions.length, data: questions})
    } catch (err) {
        res.status(404).json({ error: err })
    }
}


exports.uploadBulkQuestionsData = async (req, res, next) => {
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

        const question = await Question.create(jsonData);

        res.status(201).json({
            success: true,
            data: question
        });


    } catch (e) {
        return res.status(401).send("Bad format:" + e);
    }

}

exports.uploadQuestionData = async (req, res, next) => {
    try {
        const question = await Question.create(req.body);
        res.status(201).json({
          success: true,
          data: question,
        });

    } catch (e) {
        return res.status(401).send("Bad format:" + e);
    }

}

exports.deleteQuestion = async (req, res, next) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);

        if (question.deletedCount === 0) {
            return res.status(401).json(req.params.id+" Bad request: _id not found")
        }

        res.status(200).json({
            success: true,
            message: 'Question deleted successfully',
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ success: false, error: 'Server Error'+err });
    }
}