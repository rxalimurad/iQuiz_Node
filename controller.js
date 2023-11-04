const Joi = require('joi');


function fetchQuizWithId(id) {
    return {success: id};
}

exports.fetchQuiz = (req,res,next) => {
    try {
        let id = req.params.id;
        res.status(200).json(fetchQuizWithId(id))
    } catch(err) {
        res.status(404).json({error: err})
    }
}


exports.uploadQuizData = (req,res,next) => {
    const questionSchema = Joi.object({
        question: Joi.string().required(),
        options: Joi.array().items(Joi.string()).required(),
        correctAnswer: Joi.string().valid('A', 'B', 'C', 'D', 'E').required()
      });
    const schema = Joi.array().items(questionSchema);

    try {
        const jsonData = req.body;
        console.log(req.body);
        const { error } = schema.validate(jsonData);
        if (error) {
            return res.status(400).send(error.details[0].message);
          }
          res.send(`Data is valid! ${jsonData}`);

    } catch(err) {
        res.status(404).json({error: err})
    }

}