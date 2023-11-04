const Joi = require('joi');
const Quiz = require('../models/model.quiz');


exports.fetchQuiz = async (req, res, next) => {
    try {
        let id = req.params.id;
        const bootcamp = await Quiz.findById(id);
        return {bootcamp};

        res.status(200).json(fetchQuizWithId(id))
    } catch (err) {
        res.status(404).json({ error: err })
    }
}


exports.uploadQuizData = async (req, res, next) => {
    try {
        const questionSchema = Joi.object({
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
